import { create } from "zustand";
import { useEffect } from "react";
import { fetcher } from "@/lib/fetcher";
import { useMutation } from "@tanstack/react-query";
import { Artist } from "@/types/response.types";

interface useFollowingProps {
    followings : Artist[];
    setFollowings : ( artists : Artist[] ) => void;
    addFollowing : ( artist : Artist ) => void;
    removeFollowing : ( artistId : string ) => void;
}

export const useFollowing = create<useFollowingProps>((set, get)=>({
    followings : [],
    setFollowings : ( artists : Artist[] ) => set({ followings : artists }),
    addFollowing : ( artist : Artist ) => {
        const currentFollowings = get().followings;
        if (!currentFollowings.some(a => a.id === artist.id)) {
            set({ followings : [...currentFollowings, artist] });
        }
    },
    removeFollowing : ( artistId : string ) => {
        const currentFollowings = get().followings;
        set({ followings : currentFollowings.filter(a => a.id !== artistId) });
    }
}));

export const useFollowingSync = (token?: string) => {
    const { setFollowings } = useFollowing();
    const mutation = useMutation({
        mutationFn : async()=>{
            const data = await fetcher({
                prefix: "PROTECTED_BASE_URL",
                suffix: `api/v2/artist/followings`,
                token: token
            });
            return data.data as Artist[];
        },
        mutationKey : ['user-followings'],
        onSuccess : ( data ) => {
            setFollowings(data);
        }
    });

    useEffect(()=>{
        if(token){
            mutation.mutate();
        }
    }, [token]);
    
    return mutation;
}

export const useFollowArtist = (artist: Artist, token?: string) => {
    const { addFollowing, removeFollowing } = useFollowing();
    
    return useMutation({
        mutationFn: async () => {
            await fetcher({
                prefix: "PROTECTED_BASE_URL",
                suffix: `api/v2/artist/${artist.id}/subscribe`,
                token: token
            });
        },
        mutationKey: ['follow-artist', artist.id],
        onMutate: async () => {
            addFollowing(artist);
        },
        onError: () => {
            removeFollowing(artist.id);
        }
    });
};


export const useUnfollowArtist = (artist: Artist, token?: string) => {
    const { addFollowing, removeFollowing } = useFollowing();
    
    return useMutation({
        mutationFn: async () => {
            await fetcher({
                prefix: "PROTECTED_BASE_URL",
                suffix: `api/v2/artist/${artist.id}/unsubscribe`,
                token: token
            });
        },
        mutationKey: ['unfollow-artist', artist.id],
        onMutate: async () => {
            removeFollowing(artist.id);
        },
        onError: () => {
            addFollowing(artist);
        }
    });
};


export const useArtist = (artist: Artist, token?: string) => {
    const { followings } = useFollowing();
    const followMutation = useFollowArtist(artist, token);
    const unfollowMutation = useUnfollowArtist(artist, token);
    
    const isSubscribed = followings.some(a => a.id === artist.id);
    const isLoading = followMutation.isPending || unfollowMutation.isPending;
    
    const toggleSubscription = async () => {
        try {
            if (isSubscribed) {
                await unfollowMutation.mutateAsync();
            } else {
                await followMutation.mutateAsync();
            }
        } catch (error) {
            console.error('Error toggling subscription:', error);
            throw error;
        }
    };
    
    return {
        isSubscribed,
        isLoading,
        toggleSubscription,
        error: followMutation.error || unfollowMutation.error
    };
};