import { create } from "zustand";
import { Album, Song } from "@/types/response.types";

interface Props {
    list : ( Song & { album : Album })[];
    listId : string;
    setList : ( songs : ( Song & { album : Album} )[]) => void;
    clearList : () => void;
    setListId : ( id : string ) => void;
}

export const useArtistStack = create<Props>((set, get)=>({
    list : [],
    listId : "",
    setList : ( songs : ( Song & { album : Album} )[]) => {
        const currentStack = get().list;
        const uniqueSongs = songs.filter(song => !currentStack.some(sSong => sSong.id === song.id));
        set({list : [...get().list, ...uniqueSongs] })
    },
    clearList : () => set({list : [], listId : "" }),
    setListId : ( id : string ) => set({listId : id })
}));