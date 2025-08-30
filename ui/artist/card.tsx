import { cn } from '@/lib/utils';
import { Artist } from '@/types/response.types'
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native'

interface Props {
    data : Artist;
    className? : string;
}

export const Card = ({ data, className }: Props) => {
    return (
        <Pressable 
            className={(cn(
                "relative w-44 aspect-[3/4] flex flex-col rounded-lg overflow-hidden",
                className
            ))}
            onPress={()=>router.push({
                pathname : "/(tabs)/artist/[artistId]",
                params : { artistId : data.id }
            })}
        >
            <Image
                source={{ uri: data.image }}
                style={{ width: '100%', height: '100%' }}
                contentFit='cover'
            />
            <View className='absolute inset-0'>
                <LinearGradient
                    colors={['#00000031', '#000000d4']}
                    locations={[0.5, 1.0]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ height: "100%", width: "100%" }}
                >
                    <View
                        className='size-full flex flex-col justify-end p-4 '
                    >
                        <Text  className='text-white text-lg font-semibold'>
                            {data.name}
                        </Text>
                        <Text className='text-zinc-200 font-medium'>
                            Artist
                        </Text>
                    </View>
                </LinearGradient>
            </View>
        </Pressable>
    )
}