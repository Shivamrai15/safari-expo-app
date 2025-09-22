import { View, Text, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Error } from '@/components/ui/error';
import { useAuth } from '@/hooks/use-auth';
import { fetcher } from '@/lib/fetcher';
import Loader from '@/components/ui/loader';
import { GenreResponse } from '@/types/response.types';
import { Image } from 'expo-image';
import { router } from 'expo-router';

export const Genre = () => {

    const { user } = useAuth();
    
    const { data, error, isPending } = useQuery({
        queryFn : async()=>{
            const data = await fetcher({
                prefix : "PUBLIC_BASE_URL",
                suffix : "api/v2/genre",
                token : user?.token
            });
            return data.data as GenreResponse[] | undefined;
        },
        queryKey : ["genre"]
    });

    if (isPending) {
        return <Loader />;
    }
    
    if (error || !data) {
        return <Error />
    }

    return (
        <View className='w-full flex flex-row justify-between gap-y-10 flex-wrap'>
            {
                data.map((genre)=>(
                    <TouchableOpacity
                        key={genre.id}
                        className='w-[46%] flex flex-col gap-y-3'
                        activeOpacity={0.7}
                        onPress={()=>router.push({
                            pathname : "/genre-songs/[genreId]",
                            params : { genreId : genre.id }
                        })}
                    >
                        <View className='aspect-[3/4] rounded-3xl overflow-hidden'>
                            <Image
                                source={{
                                    uri : genre.video?.image,
                                }}
                                style={{
                                    height : "100%",
                                    width : "100%",
                                }}
                                contentFit="cover"
                            />
                        </View>
                        <Text className='text-white font-semibold text-center'>
                            {genre.name}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}