import { Text, View } from "react-native";
import { Album, Artist, Song } from "@/types/response.types";
import Feather from '@expo/vector-icons/Feather';
import { Item } from "./items";

interface Props {
    data : (Song & { album: Album, artists : Artist[] })[];
}

export const List = ({ data }: Props) => {
    return (
        <View className="w-full flex flex-col gap-y-4 py-5" >
            <View className="w-full flex flex-col gap-y-4 px-6">
                <View className="w-full flex flex-row items-center justify-between gap-4 px-4 ">
                    <View className="flex flex-row items-center gap-4 font-semibold text-lg">
                        <Text className="w-8 text-white text-xl font-bold">#</Text>
                        <Text className="text-white text-xl font-semibold">Title</Text>
                    </View>
                    <View className="flex items-center w-14 justify-center">
                        <Feather name="clock" size={24} color="white" />
                    </View>
                </View>
                <View className="bg-zinc-600 h-0.5 w-full rounded-full"/>
                <View className="flex flex-col gap-y-5">
                    {
                        data.map((item, index) => (
                            <Item key={item.id} song={item} index={index} />
                        ))
                    }
                </View>
            </View>
        </View>
    )
}
