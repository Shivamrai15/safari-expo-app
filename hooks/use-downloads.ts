import { create } from "zustand";
import { SongResponse } from "@/types/response.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

export interface DownloadedSong extends SongResponse {
    isDownloading: boolean;
    downloadProgress: number;
    localPath?: string;
    isDownloaded: boolean;
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
                    song.id === id ? { ...song, downloadProgress: progress } : song
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
                    isDownloading,
                    isDownloaded,
                    localPath: localPath || song.localPath,
                    url: localPath || song.url,
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
