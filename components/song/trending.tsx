import { TrendingSong } from "@/types/response.types"
import { Image } from "expo-image"
import { Text, View } from "react-native"

interface Props {
    song : TrendingSong;
    index : number;
}

export const Trending = ({ song, index }: Props) => {
    return (
        <View className="flex flex-row w-auto items-end">
            <Text className="font-extrabold text-[14rem] z-10 p-0 m-0 leading-none tracking-tighter  text-neutral-700" >
                {index + 1}
            </Text>
            <View className="flex flex-col -translate-x-2">
                <View className="h-36 w-36 relative">
                    <Image
                        source={{ uri: song.image }}
                        style={{ height: "100%", width: "100%", objectFit: "cover" }}
                    />
                </View>
                <View className="w-36 p-4 overflow-hidden">
                    <Text className="font-medium line-clamp-1 text-white">
                        {song.name}
                    </Text>
                </View>
            </View>
        </View>
    )
}
