import { create } from "zustand";
import { Album, Song } from "@/types/response.types";

interface Props {
    uuid: string;
    data : ( Song & { album : Album } )[];
    setData : (data : ( Song & { album : Album } )[])=>void;
    clearData : () => void;
    setUuid : ( id : string ) => void;
    clearUuid : () => void;
}

export const usePlaylistStack = create<Props>((set)=>({
    uuid : "",
    data : [],
    setData : (data : ( Song & { album : Album } )[])=>set({data}),
    clearData : () => set({data : []}),
    setUuid : ( id : string ) => set({ uuid : id }),
    clearUuid : () => set({uuid : ""})
}));