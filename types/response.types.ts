export type Album = {
    name: string;
    id: string;
    image: string;
    color: string;
    release: string;
    labelId: string | null;
};

export type Artist = {
    name: string;
    id: string;
    image: string;
};

export type Song = {
    name: string;
    id: string;
    image: string;
    url: string;
    duration: number;
    albumId: string;
    artistIds: string[];
};

export type TrendingSong = Song & { album : Album };