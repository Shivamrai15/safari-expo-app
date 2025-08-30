import { Error } from '@/components/error';
import Loader from '@/components/loader';
import { useAuth } from '@/hooks/use-auth';
import { fetcher } from '@/lib/fetcher';
import { Artist, PlayList } from '@/types/response.types';
import { Card } from '@/ui/artist/card';
import { useQueries } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="p-4 py-10 pb-20 flex flex-col gap-y-10">
                <View className='flex flex-col gap-y-6'>
                    <Text className="text-white font-bold text-2xl block">Playlists</Text>
                    <View className='w-full flex flex-row justify-between gap-y-4 flex-wrap'>
                        <Pressable className='w-[48%] p-2 bg-neutral-800 rounded-lg'>

                        </Pressable>
                        <Pressable
                            className='w-[48%] p-2 bg-neutral-800 rounded-lg flex flex-col gap-y-6'
                        >
                            <View className='w-full h-44'>
                                <Image
                                    source={require("@/assets/images/liked-thumb.png")}
                                    style={{ width: '100%', height: '100%', borderRadius: 8 }}
                                />
                            </View>
                            <View>
                                <Text className="text-white font-bold text-lg">Liked Songs</Text>
                                <Text className="text-neutral-400">10 tracks</Text>
                            </View>
                        </Pressable>
                        {
                            userPlaylists.data.map((playlist: PlayList & { _count: {songs: number }})=> (
                                <Pressable
                                    key={playlist.id}
                                    className='w-[48%] p-2 bg-neutral-800 rounded-lg flex flex-col gap-y-6'
                                >
                                    <View className='w-full h-44'>
                                        <Image
                                            source={ playlist.image ? { uri : playlist.image } : require("@/assets/images/playlist.png")}
                                            style={{ width: '100%', height: '100%', borderRadius: 8 }}
                                            contentFit='cover'
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-white font-bold text-lg">{playlist.name}</Text>
                                        <Text className="text-neutral-400">{playlist._count.songs} tracks</Text>
                                    </View>
                                </Pressable>
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
    );
}

export default Playlist;