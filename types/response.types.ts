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

export type Label = {
    id: string;
    name: string;
    image?: string;
    color: string;
};

export type TrendingSong = Song & { album : Album };

export type SongResponse = Song & { album : Album , artists : Artist[] };

export type AlbumResponse = Album & { songs : SongResponse[], label : Label|null };