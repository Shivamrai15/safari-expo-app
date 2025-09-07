import { SongResponse } from "@/types/response.types";
import { create } from "zustand";

interface Props {
    data : SongResponse|null,
    openOptions : ( data : SongResponse ) => void,
    closeOptions : () => void
}

export const useOptions = create<Props>((set) => ({
    data: null,
    openOptions: (data) => set({ data }),
    closeOptions: () => set({ data: null })
}));
