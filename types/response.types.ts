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

export type PlayList = {
    id: string;
    name: string;
    image: string | null;
    isArchived: boolean;
    description: string | null;
    color: string | null;
    userId: string;
    private: boolean;
    createdAt: Date;
    updatedAt: Date;
    archivedAt: Date | null;
};

export type TrendingSong = Song & { album: Album };

export type SongResponse = Song & { album: Album; artists: Artist[] };

export type AlbumResponse = Album & {
  songs: SongResponse[];
  label: Label | null;
};

export type ArtistResponse = {
    name: string;
    id: string;
    image: string;
    thumbnail: string | null;
    about: string;
} & {
    songs: SongResponse[];
    _count: {
        followers: number;
    };
};


export type ArtistProfileResponse = {
    name: string;
    id: string;
    image: string;
    _count: {
        songs: number;
        followers: number;
    };
}

export type LikedSongTracksResponse = {
    id: string;
    songId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    song: SongResponse;
};

export type HistoryItem = {
    id: string;
    songId: string;
    userId: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    song: SongResponse;
};

export type Tab = "DEFAULT" | "ALBUM" | "SONG" | "ARTIST";

export type AllSearchResponse = {
    query: string;
    topResult: SongResponse | Album | Artist | null | undefined;
    albums: Album[] | undefined;
    songs: SongResponse[];
    artists: Artist[] | undefined;
}

export type AlbumSearchResponse = {
    query : string;
    albums: Album[];
}