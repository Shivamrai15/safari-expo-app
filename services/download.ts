import * as FileSystem from "expo-file-system";
import { useDownloads, DownloadedSong } from "@/hooks/use-downloads";
import { SongResponse } from "@/types/response.types";

interface DownloadProgress {
    totalBytes: number;
    downloadedBytes: number;
    progress: number;
}

export class DownloadManager {
    private static instance: DownloadManager;
    private activeDownloads: Map<string, AbortController> = new Map();
    private downloadCallbacks: Map<
        string,
        (progress: DownloadProgress) => void
    > = new Map();

    private constructor() {}

    public static getInstance(): DownloadManager {
        if (!DownloadManager.instance) {
            DownloadManager.instance = new DownloadManager();
        }
        return DownloadManager.instance;
    }

    public async downloadSong(
        song: SongResponse,
        onProgress?: (progress: DownloadProgress) => void
    ): Promise<string | null> {
        const {
            updateSongDownloadStatus,
            updateSongProgress,
            setSong,
            getSongById,
        } = useDownloads.getState();

        if (this.activeDownloads.has(song.id)) {
            console.log(`Song ${song.id} is already being downloaded`);
            return null;
        }

        const abortController = new AbortController();
        this.activeDownloads.set(song.id, abortController);

        try {
            const existingSong = getSongById(song.id);
            if (!existingSong) {
                const downloadSong: DownloadedSong = {
                    ...song,
                    isDownloading: true,
                    downloadProgress: 0,
                    isDownloaded: false,
                };
                setSong(downloadSong);
            } else {
                updateSongDownloadStatus(song.id, true, false);
            }

            if (onProgress) this.downloadCallbacks.set(song.id, onProgress);

            const downloadsDir = await this.ensureDownloadsDirectory();
            const fileName = `${song.id}_${song.name.replace(
                /[^a-zA-Z0-9]/g,
                "_"
            )}.m3u8`;

            const localPath = `${downloadsDir}/${fileName}`;
            
            // Download in background without blocking UI
            const success = await this.downloadM3U8FileBackground(
                song.url, 
                localPath, 
                song.id,
                abortController.signal
            );

            if (success && !abortController.signal.aborted) {
                updateSongDownloadStatus(song.id, false, true, localPath);
                console.log(`Downloaded ${song.name} to ${localPath}`);
                return localPath;
            } else {
                updateSongDownloadStatus(song.id, false, false);
                return null;
            }
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error(`Error downloading song ${song.id}:`, error);
                updateSongDownloadStatus(song.id, false, false);
            }
            return null;
        } finally {
            this.activeDownloads.delete(song.id);
            this.downloadCallbacks.delete(song.id);
        }
    }

    private async downloadM3U8FileBackground(
        url: string,
        localPath: string,
        songId: string,
        signal: AbortSignal
    ): Promise<boolean> {
        const { updateSongProgress } = useDownloads.getState();

        try {
            // Check for cancellation
            if (signal.aborted) return false;

            const playlistResponse = await fetch(url, { signal });
            if (!playlistResponse.ok) {
                throw new Error(`Failed to fetch M3U8: ${playlistResponse.status}`);
            }

            const playlistContent = await playlistResponse.text();
            
            // Yield control to main thread after parsing
            await this.yieldToMainThread();
            
            if (signal.aborted) return false;

            const segmentUrls = this.parseM3U8Segments(playlistContent, url);
            if (segmentUrls.length === 0) {
                throw new Error("No segments found in M3U8 file");
            }

            const songDir = localPath.replace(".m3u8", "");
            const segmentsDir = `${songDir}_segments`;

            // Ensure directory exists
            const dirInfo = await FileSystem.getInfoAsync(segmentsDir);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(segmentsDir, {
                    intermediates: true,
                });
            }

            const totalFiles = segmentUrls.length + 1;
            let completedFiles = 1;
            updateSongProgress(songId, Math.round((completedFiles / totalFiles) * 100));

            // Download segments in background with batching
            const downloadedSegments = await this.downloadSegmentsBackground(
                segmentUrls,
                segmentsDir,
                songId,
                signal,
                (progress) => {
                    completedFiles = 1 + progress.completed;
                    const progressPercent = Math.round((completedFiles / totalFiles) * 100);
                    updateSongProgress(songId, progressPercent);

                    const cb = this.downloadCallbacks.get(songId);
                    if (cb) {
                        cb({
                            totalBytes: totalFiles,
                            downloadedBytes: completedFiles,
                            progress: progressPercent,
                        });
                    }
                }
            );

            if (signal.aborted) return false;

            if (downloadedSegments.length === 0) {
                throw new Error("No segments were successfully downloaded");
            }

            const localM3U8Content = this.createLocalM3U8(
                playlistContent,
                downloadedSegments,
                (segmentFileName) => `${segmentsDir.split("/").pop()}/${segmentFileName}`
            );

            await FileSystem.writeAsStringAsync(localPath, localM3U8Content);
            updateSongProgress(songId, 100);

            return true;

        } catch (error: any) {
            if (error.name === 'AbortError' || signal.aborted) {
                console.log(`Download cancelled for song ${songId}`);
                return false;
            }
            console.error("Error in downloadM3U8FileBackground:", error);
            throw error; // Re-throw to be handled by the calling function
        }
    }

    private async downloadSegmentsBackground(
        segmentUrls: string[],
        segmentsDir: string,
        songId: string,
        signal: AbortSignal,
        onProgress: (progress: { completed: number; total: number }) => void
    ): Promise<string[]> {
        const BATCH_SIZE = 3; // Download 3 segments simultaneously
        const downloadedSegments: string[] = [];
        let completed = 0;

        // Process in batches to avoid overwhelming the system
        for (let i = 0; i < segmentUrls.length; i += BATCH_SIZE) {
            if (signal.aborted) break;

            const batch = segmentUrls.slice(i, i + BATCH_SIZE);
            
            // Download batch in parallel
            const batchPromises = batch.map(async (segmentUrl, batchIndex) => {
                const globalIndex = i + batchIndex;
                const segmentFileName = this.getSegmentFileName(segmentUrl, globalIndex);
                const segmentLocalPath = `${segmentsDir}/${segmentFileName}`;

                try {
                    // Check if file already exists
                    const fileInfo = await FileSystem.getInfoAsync(segmentLocalPath);
                    if (fileInfo.exists) {
                        return segmentFileName;
                    }

                    // Use downloadAsync which runs in background
                    const downloadResult = await FileSystem.downloadAsync(segmentUrl, segmentLocalPath);
                    
                    if (downloadResult.status === 200) {
                        return segmentFileName;
                    } else {
                        console.error(`Failed to download segment: ${downloadResult.status}`);
                        return null;
                    }
                } catch (err: any) {
                    console.error(`Failed to download segment ${segmentUrl}:`, err.message);
                    return null;
                }
            });

            const batchResults = await Promise.allSettled(batchPromises);
            
            batchResults.forEach((result) => {
                if (result.status === 'fulfilled' && result.value) {
                    downloadedSegments.push(result.value);
                }
                completed++;
            });

            // Update progress after each batch
            onProgress({ completed, total: segmentUrls.length });

            // Critical: Yield control back to main thread between batches
            await this.yieldToMainThread();
        }

        return downloadedSegments;
    }

    // Yield control back to main thread
    private async yieldToMainThread(): Promise<void> {
        return new Promise(resolve => {
            setImmediate ? setImmediate(() => resolve()) : setTimeout(() => resolve(), 0);
        });
    }

    private parseM3U8Segments(content: string, baseUrl: string): string[] {
        const lines = content.split("\n");
        const segments: string[] = [];
        
        try {
            const urlObject = new URL(baseUrl);
            const baseUrlPath = baseUrl.substring(0, baseUrl.lastIndexOf('/'));

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith("#") || !trimmedLine) continue;

                if (
                    trimmedLine.includes(".ts") ||
                    trimmedLine.includes(".m4s") ||
                    trimmedLine.includes(".mp4")
                ) {
                    let segmentUrl = trimmedLine;
                    
                    if (!segmentUrl.startsWith("http")) {
                        if (segmentUrl.startsWith("/")) {
                            // Absolute path
                            segmentUrl = `${urlObject.protocol}//${urlObject.host}${segmentUrl}`;
                        } else {
                            // Relative path
                            segmentUrl = `${baseUrlPath}/${segmentUrl}`;
                        }
                    }
                    segments.push(segmentUrl);
                }
            }
        } catch (error) {
            console.error("Error parsing M3U8 segments:", error);
        }
        
        return segments;
    }

    private getSegmentFileName(segmentUrl: string, index: number): string {
        try {
            const urlParts = segmentUrl.split("/");
            const originalName = urlParts[urlParts.length - 1];
            const nameWithoutQuery = originalName.split("?")[0];

            // If the name doesn't have an extension, create one
            if (!nameWithoutQuery.includes(".") || nameWithoutQuery.length === 0) {
                return `segment_${index.toString().padStart(3, "0")}.ts`;
            }
            
            return nameWithoutQuery;
        } catch (error) {
            return `segment_${index.toString().padStart(3, "0")}.ts`;
        }
    }

    private createLocalM3U8(
        originalContent: string,
        downloadedSegments: string[],
        getLocalPath: (segmentFileName: string) => string
    ): string {
        const lines = originalContent.split("\n");
        const newLines: string[] = [];
        let segmentIndex = 0;

        for (const line of lines) {
            const trimmed = line.trim();
            if (
                !trimmed.startsWith("#") &&
                trimmed &&
                (trimmed.includes(".ts") ||
                trimmed.includes(".m4s") ||
                trimmed.includes(".mp4"))
            ) {
                if (segmentIndex < downloadedSegments.length) {
                    newLines.push(getLocalPath(downloadedSegments[segmentIndex]));
                    segmentIndex++;
                } else {
                    // If we don't have this segment downloaded, keep original URL
                    newLines.push(line);
                }
            } else {
                newLines.push(line);
            }
        }
        return newLines.join("\n");
    }

    private async ensureDownloadsDirectory(): Promise<string> {
        const downloadsDir = `${FileSystem.documentDirectory}downloads`;
        
        try {
            const dirInfo = await FileSystem.getInfoAsync(downloadsDir);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });
            }
        } catch (error) {
            console.error("Error creating downloads directory:", error);
            throw error;
        }
        
        return downloadsDir;
    }

    public cancelDownload(songId: string): void {
        const { updateSongDownloadStatus } = useDownloads.getState();
        const abortController = this.activeDownloads.get(songId);
        
        if (abortController) {
            abortController.abort();
            this.activeDownloads.delete(songId);
            this.downloadCallbacks.delete(songId);
            updateSongDownloadStatus(songId, false, false);
            console.log(`Download cancelled for song ${songId}`);
        }
    }

    public async deleteDownload(songId: string): Promise<boolean> {
        const { getSongById, removeSong } = useDownloads.getState();
        const song = getSongById(songId);
        if (!song?.localPath) return false;

        try {
            // Delete the M3U8 file
            const fileInfo = await FileSystem.getInfoAsync(song.localPath);
            if (fileInfo.exists) {
                await FileSystem.deleteAsync(song.localPath, { idempotent: true });
            }

            // Delete the segments directory
            const segmentsDir = song.localPath.replace(".m3u8", "") + "_segments";
            const segmentsDirInfo = await FileSystem.getInfoAsync(segmentsDir);
            if (segmentsDirInfo.exists) {
                await FileSystem.deleteAsync(segmentsDir, { idempotent: true });
            }

            removeSong(songId);
            return true;
        } catch (err: any) {
            console.error("Error deleting download:", err.message);
            return false;
        }
    }

    public getLocalPath(songId: string): string | null {
        const { getSongById } = useDownloads.getState();
        return getSongById(songId)?.localPath || null;
    }

    public isDownloaded(songId: string): boolean {
        const { getSongById } = useDownloads.getState();
        return getSongById(songId)?.isDownloaded || false;
    }

    public isDownloading(songId: string): boolean {
        return this.activeDownloads.has(songId);
    }

    public getDownloadProgress(songId: string): number {
        const { getSongById } = useDownloads.getState();
        return getSongById(songId)?.downloadProgress || 0;
    }

    public getAllDownloads(): DownloadedSong[] {
        const { songs } = useDownloads.getState();
        return songs;
    }
}
