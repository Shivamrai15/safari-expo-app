import { router } from 'expo-router';
import { Error } from '@/components/ui/error';
import Loader from '@/components/ui/loader';
import { useAuth } from '@/hooks/use-auth';
import { fetcher } from '@/lib/fetcher';
import { NetworkProvider } from '@/providers/network.provider';
import { Artist, PlayList } from '@/types/response.types';
import { Card } from '@/components/artist/card';
import { Image } from 'expo-image';
import { useQueries } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';


const Playlist = () => {

    const { user } = useAuth();

    const [ userPlaylists, userFollowings ] = useQueries({
        queries : [
            {
                queryFn : async() => {
                    const data = await fetcher({
                        prefix : "PROTECTED_BASE_URL",
                        suffix : "api/v2/playlist",
                        token : user?.token
                    });
                    return data.data;
                },
                queryKey : ['user-playlists'],
            },
            {
                 queryFn : async() => {
                    const data = await fetcher({
                        prefix : "PROTECTED_BASE_URL",
                        suffix : "api/v2/artist/followings",
                        token : user?.token
                    });
                    return data.data;
                },
                queryKey : ['user-followings'],
            }
        ]
    });

    if (userPlaylists.isPending || userFollowings.isPending) {
        return <Loader />
    }

    if (userPlaylists.error || userFollowings.error) {
        return (
            <Error />
        );
    }

    return (
        <NetworkProvider>
            <SafeAreaView className="flex-1 bg-background">
                <ScrollView className="p-6 pb-10 flex flex-col gap-y-10">
                    <View className='flex flex-col gap-y-6'>
                        <View className='flex flex-row justify-between items-center'>
                            <Text className="text-white font-bold text-2xl block">Playlists</Text>
                        </View>
                        <View className='w-full flex-col justify-between gap-y-4 flex-wrap'>
                            <TouchableOpacity
                                className='w-full flex flex-row items-center bg-neutral-800 rounded-3xl p-2 gap-x-4'
                                activeOpacity={0.7}
                                onPress={()=>router.push("/(tabs)/liked-songs")}
                            >
                                <View className='size-14 rounded-2xl overflow-hidden relative'>
                                    <Image
                                        source={require("@/assets/images/liked-thumb.png")}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                                <View className='flex-1 flex flex-col gap-y-1'>
                                    <Text className='text-white font-semibold text-lg'>Liked Songs</Text>
                                    <Text className='text-neutral-400'>10 Tracks</Text>
                                </View>
                            </TouchableOpacity>
                            {
                                userPlaylists.data.map((playlist: PlayList & { _count: {songs: number }})=> (
                                    <TouchableOpacity
                                        className='w-full flex flex-row items-center bg-neutral-800 rounded-3xl p-2 gap-x-4'
                                        activeOpacity={0.7}
                                        key={playlist.id}
                                        onPress={()=>router.push({
                                            pathname : "/(tabs)/playlist-songs/[playlistId]",
                                            params : { playlistId : playlist.id }
                                        })}
                                    >
                                        <View className='size-14 rounded-2xl overflow-hidden relative'>
                                            <Image
                                                source={playlist?.image ? {uri: playlist.image} : require("@/assets/images/playlist.png")}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </View>
                                        <View className='flex-1 flex flex-col gap-y-1'>
                                            <Text className='text-white font-semibold text-lg'>{playlist.name}</Text>
                                            <Text className='text-neutral-400'>{playlist._count.songs} Tracks</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                    <View className='flex flex-col gap-y-6 pt-10'>
                        <Text className="text-white font-bold text-2xl block">Following</Text>
                        <View className='w-full flex flex-row justify-between gap-y-4 flex-wrap'>
                            {
                                userFollowings.data.map((artist: Artist) => (
                                    <Card
                                        key={artist.id}
                                        className='w-[48%]'
                                        data={artist}
                                    />
                                ))
                            }
                        </View>
                    </View>
                    <View className="h-40" />
                </ScrollView>
            </SafeAreaView>
        </NetworkProvider>
    );
}

export default Playlist;