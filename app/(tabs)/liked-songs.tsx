import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/ui/liked/header';
import { SongItem } from '@/ui/song/item';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { fetcher } from '@/lib/fetcher';
import { LikedSongTracksResponse } from '@/types/response.types';
import Loader from '@/components/loader';
import { Error } from '@/components/error';

const LikedSongs = () => {

    const { user } = useAuth();

    const { data, isPending, error } = useQuery({
        queryFn : async()=>{
            const data = await fetcher({
                prefix : "PROTECTED_BASE_URL",
                suffix : 'api/v2/song/liked/tracks',
                token : user?.token
            });
            return data.data as LikedSongTracksResponse[];
        },
        queryKey: ["liked-songs"]
    });

    if (isPending) {
        return <Loader />
    }

    if (error || !data){
        return <Error />
    }

    const songs = data.map(item => item.song);

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="flex flex-col gap-y-10">
                <LinearGradient
                    colors={['#111111', '#87141b']}
                    locations={[0.8, 1.0]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ height: "100%", width: "100%" }}
                >
                    <Header
                        totalSongs={songs.length}
                        songs={songs}
                    />
                    <View className='px-4 mt-10 flex flex-col gap-y-5'>
                        {songs.map(song => (
                            <SongItem key={song.id} data={song} />
                        ))}
                    </View>
                </LinearGradient>
                <View className="h-40" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default LikedSongs;