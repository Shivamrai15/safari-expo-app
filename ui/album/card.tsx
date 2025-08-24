import { Image } from 'expo-image';
import { Button } from '@/components/button';
import { Text, View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Album } from '@/types/response.types';
import { router } from 'expo-router';

interface Props {
    album : Album;
}

export const Card = ({ album }: Props) => {
    return (
        <Pressable
            className="relative w-44 flex flex-col"
            onPress={()=>router.push({
                pathname : "/(tabs)/album/[albumId]",
                params : {
                    albumId : album.id
                }
            })}
        >
            <View className="h-1 mx-4 rounded-t-lg" style={{backgroundColor : `${album.color}5e`}} />
            <View className="h-1 mx-2 rounded-t-lg" style={{backgroundColor : `${album.color}`}} />
            <View className="w-full rounded-lg bg-neutral-900 overflow-hidden">
                <Image
                    source={{
                        uri : album.image
                    }}
                    style={{
                        width: "100%",
                        height: 156,
                    }}
                />
                <View className="p-4 bg-neutral-900">
                    <Text className="text-white font-semibold line-clamp-1">
                        {album.name}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}
