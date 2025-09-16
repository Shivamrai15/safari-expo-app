import { create } from "zustand";
import { SongResponse } from "@/types/response.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

export type DownloadedSong = SongResponse & {
    download : {
        isDownloading: boolean;
        downloadProgress: number;
        localPath?: string;
        localImagePath?: string;
        isDownloaded: boolean;
    }
}

interface Props {
    songs: DownloadedSong[];
    setSong: (song: DownloadedSong) => void;
    updateSongProgress: (id: string, progress: number) => void;
    updateSongDownloadStatus: (
        id: string,
        isDownloading: boolean,
        isDownloaded?: boolean,
        localPath?: string
    ) => void;
    updateSongImage: (id: string, localImagePath: string) => void;
    removeSong: (id: string) => void;
    clearSongs: () => void;
    getSongById: (id: string) => DownloadedSong | undefined;
}

export const useDownloads = create(
    persist<Props>(
        (set, get) => ({
            songs: [],
            setSong: (song) => set({ songs: [...get().songs, song] }),
            updateSongProgress: (id, progress) =>
                set({
                    songs: get().songs.map((song) =>
                        song.id === id 
                            ? { 
                                ...song, 
                                download: {
                                    ...song.download,
                                    downloadProgress: progress 
                                }
                              } 
                            : song
                    ),
                }),
            updateSongDownloadStatus: (
                id,
                isDownloading,
                isDownloaded = false,
                localPath
            ) =>
                set({
                    songs: get().songs.map((song) =>
                        song.id === id
                            ? {
                                ...song,
                                download: {
                                    ...song.download,
                                    isDownloading,
                                    isDownloaded,
                                    localPath: localPath || song.download.localPath,
                                },
                                // Update the main song URL if we have a local path
                                url: localPath || song.url,
                              }
                            : song
                    ),
                }),
            updateSongImage: (id, localImagePath) =>
                set({
                    songs: get().songs.map((song) =>
                        song.id === id
                            ? { 
                                ...song, 
                                download: {
                                    ...song.download,
                                    localImagePath,
                                },
                                // Update the main song image URL to local path
                                image: localImagePath
                              }
                            : song
                    ),
                }),
            removeSong: (id) => set({ songs: get().songs.filter((song) => song.id !== id) }),
            clearSongs: () => set({ songs: [] }),
            getSongById: (id) => get().songs.find((song) => song.id === id),
        }),
        {
            name: "downloads-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
