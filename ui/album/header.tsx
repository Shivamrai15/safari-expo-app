import { Image } from "expo-image";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from '@expo/vector-icons/Entypo';
import { AlbumResponse } from "@/types/response.types";
import { albumDuration } from "@/lib/utils";
import { PlayButton } from "./play-button";
import { ShuffleButton } from "../song/shuffle-button";

interface Props {
    data : AlbumResponse;
}

export const Header = ({ data }: Props) => {
    return (
        <LinearGradient
            colors={[data.color, '#111111']}
            locations={[0.4, 0.3]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={{
                width: '100%',
            }}  
        >
            <View className="p-10">
                <View className="flex flex-col items-center">
                    <View className="relative shrink-0 aspect-square h-44 w-44 overflow-hidden rounded-lg">
                        <Image
                            source={{ uri: data.image }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit : "cover"
                            }}
                        />
                    </View>
                    <View className="flex flex-col gap-y-2 mt-4 text-center">
                        <Text className="text-white text-4xl font-extrabold line-clamp-1 py-1 overflow-hidden">
                            {data.name}
                        </Text>
                        <View className="flex flex-row items-center justify-center">
                            <Text className="text-white font-semibold">
                                {data.songs.length} Songs
                            </Text>
                            <Entypo name="dot-single" size={24} color="white" />
                            <Text className="text-white font-semibold">
                                {new Date(data.release).getFullYear()}
                            </Text>
                            <Entypo name="dot-single" size={24} color="white" />
                            <Text className="text-white font-semibold">
                                {albumDuration(data.songs.reduce((acc, song) => acc + song.duration, 0))}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-center items-center gap-6 pt-2">
                            <PlayButton songs={data.songs} id={data.id} />
                            <ShuffleButton />
                            {/* 
                                TODO :
                                1. PlayButton
                                2. Shuffle Button
                                3. Options Button
                            */}
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

