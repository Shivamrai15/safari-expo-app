import { Album, Artist, Song } from "@/types/response.types"
import { Image } from "expo-image"
import { Pressable, Text, View } from "react-native"

interface Props {
    song : Song & { album : Album, artists : Artist[] }
}

export const FlatCard = ({ song }: Props) => {
    return (
        <Pressable
            className="w-full p-2 flex flex-row items-center gap-x-4 bg-neutral-800 rounded-md overflow-hidden"
        >
            <Image
                source={{
                    uri: song.image
                }}
                style={{ width: 56, height: 56 }}
                contentFit="contain"
            />
            <View className="flex-1">
                <Text className="text-white font-semibold" numberOfLines={1} ellipsizeMode="tail" >{song.name}</Text>
                <Text className="text-neutral-400 font-medium text-sm" numberOfLines={1} ellipsizeMode="tail" >{song.artists.map(artist => artist.name).join(", ")}</Text>
            </View>
        </Pressable>
    )
}
