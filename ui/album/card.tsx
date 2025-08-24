import { Image } from 'expo-image';
import { Button } from '@/components/button';
import { Text,View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Album } from '@/types/response.types';

interface Props {
    album : Album;
}

export const Card = ({ album }: Props) => {
    return (
        <View
            className="relative w-44 flex flex-col"
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
                <Button 
                    className="absolute rounded-full p-0 w-12 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    variant="theme"
                >
                    <Entypo name="controller-play" size={24} color="white" />
                </Button>
            </View>
        </View>
    )
}
