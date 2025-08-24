import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { albumDuration } from "@/lib/utils";
import { SongResponse } from "@/types/response.types"

interface Props {
    song : SongResponse;
    index : number;
}

export const Item = ({ song, index }: Props) => {
    return (
        <Pressable>
            <View className="flex flex-row items-center gap-x-4 font-semibold text-lg px-4">
                <Text className="w-8 text-white text-lg shrink-0 font-medium">
                    {index + 1}
                </Text>
                <View className="w-full flex-1 shrink overflow-hidden">
                    <Text
                        className="text-white font-medium text-lg"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {song.name}
                    </Text>
                    <View className="line-clamp-1 font-normal overflow-hidden flex flex-row gap-x-2">
                        {
                            song.artists.map((artist, idx)=>(
                                <Link key={artist.id} href={`/`}>
                                    <Text
                                        className="text-sm text-zinc-300 flex-1"
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {artist.name}{ (idx !== song.artists.length-1)&&"," }
                                    </Text>
                                </Link>
                            ))
                        }
                    </View>
                </View>
                <View className="flex flex-row items-center">
                    <View className="flex flex-row items-center w-14 justify-center">
                        <Text className="text-white font-medium text-lg">
                            { albumDuration(song.duration) }
                        </Text>
                    </View>
                    <View className="w-12 flex flex-row items-center justify-center">

                    </View>
                </View>
            </View>
        </Pressable>
    )
}
