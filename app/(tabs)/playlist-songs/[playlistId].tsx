import {
    View,
    Text,
    ScrollView,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { Fragment, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';
import { NetworkProvider } from '@/providers/network.provider';
import Loader from '@/components/loader';
import { Error } from '@/components/error';
import { PlaylistResponse, PlaylistSongResponse } from '@/types/response.types';
import { Header } from '@/ui/playlist/header';
import Feather from '@expo/vector-icons/Feather';
import { PROTECTED_BASE_URL } from '@/constants/api.config';
import { useInfinite } from '@/hooks/use-infinite';
import { SongItem } from '@/ui/song/item';
import { Button } from '@/components/button';


const PlaylistSongs = () => {

    const { user } = useAuth();
    const [atEnd, setAtEnd] = useState(false);
    const { playlistId } = useLocalSearchParams();

    const { data, error, isPending } = useQuery({
        queryFn : async() => {
            const data = await fetcher({
                prefix : "PROTECTED_BASE_URL",
                suffix : `api/v2/playlist/${playlistId}`,
                token : user?.token
            });
            return data.data as PlaylistResponse;
        },
        queryKey : ["playlist", playlistId],
    });


        
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        setAtEnd(isEnd);
    };

    const { data: songData, status, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfinite({
        url: `${PROTECTED_BASE_URL}/api/v2/playlist/${playlistId}/songs`,
        queryKey: `playlist-songs-${playlistId}`,
        token: user?.token,
        paramKey: "",
        paramValue: "",
    });

    useEffect(()=>{
        if(atEnd && hasNextPage){
            fetchNextPage();
        }
    }, [atEnd, hasNextPage]);

    if (isPending || status === "pending") {
        return (<Loader/>)
    }

    if (error || !data || status === "error") {
        return (<Error />)
    }

    return (
        <NetworkProvider>
            <SafeAreaView className='flex-1 bg-background'>
                <ScrollView
                    className='flex-1'
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <Header
                        name={data.name}
                        image={data.image ?? undefined}
                        songCount={data._count.songs}
                        id={data.id}
                        color={data.color ?? undefined}
                    />
                    <View className="w-full flex flex-col gap-y-6 px-6">
                        <View className="w-full flex flex-row items-center justify-between gap-4">
                            <View className="flex flex-row items-center gap-4 font-semibold text-lg">
                                <Text className="w-14 text-white text-xl font-bold text-center">#</Text>
                                <Text className="text-white text-xl font-semibold">Title</Text>
                            </View>
                            <View className="flex items-center w-14 justify-center">
                                <Feather name="clock" size={20} color="white" />
                            </View>
                        </View>
                        <View className="bg-zinc-600 h-0.5 w-full rounded-full"/>
                        {
                            songData?.pages.map((group, i)=>(
                                    <Fragment key={i} >
                                        {
                                            group.items.map((playlistSong: PlaylistSongResponse) => (
                                                <SongItem key={playlistSong.id} data={playlistSong.song} />
                                            ))
                                        }
                                    </Fragment>
                                ))
                        }
                        {
                            isFetchingNextPage ? (<View className='w-full h-6'>
                                <Loader />
                            </View>) : (
                                <View
                                    className='w-full items-center justify-center flex pt-8'
                                >
                                    <Button
                                        className='h-14 rounded-full w-fit px-4'
                                        onPress={() => router.push({
                                            pathname : "/[playlistId]",
                                            params : {
                                                playlistId : playlistId as string
                                            }
                                        })}
                                        variant='secondary'
                                    >
                                        <Text className='font-semibold text-white'>
                                            Add songs to this Playlist
                                        </Text>
                                    </Button>
                                </View>
                            )
                        }
                    </View>
                    <View className='h-40'/>
                </ScrollView>
            </SafeAreaView>
        </NetworkProvider>
    )
}

export default PlaylistSongs