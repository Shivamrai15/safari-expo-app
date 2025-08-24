import axios from "axios";
import { Link } from "expo-router";
import { Text, View, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Trending } from "../song/trending";
import { PUBLIC_BASE_URL } from "@/constants/api.config";
import { fetcher } from "@/lib/fetcher";


const TrendingSongs = () => {
    
    const { data, isPending, error } = useQuery({
        queryFn : async()=>{
            const data = await fetcher({
                prefix : "PUBLIC_BASE_URL",
                suffix : "api/v2/song/trending"
            });
            return data.items;
        },
        queryKey : ["trending-songs"]
    });
    
    if (error || isPending) {
        return null;
    }


    return (
        <View className="flex flex-col gap-y-6 pt-10">
            <View className="flex flex-row justify-between items-center">
                <Text className="text-white font-bold text-2xl block">
                    Trending Songs
                </Text>
                <Link href="/">
                    <Text className="text-zinc-300 font-bold">
                        More
                    </Text>
                </Link>
            </View>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                renderItem={({ item, index })=>(
                    <Trending song={item} index={index} />
                )}
            />
        </View>
    )
}

export default TrendingSongs;
