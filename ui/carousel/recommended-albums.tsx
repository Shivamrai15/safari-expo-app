import axios from "axios"
import { FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query"
import { PUBLIC_BASE_URL } from "@/constants/api.config"
import { Card } from "../album/card";


export const RecommendedAlbums = () => {

    const { data, isPending, error } = useQuery({
        queryFn : async()=>{
            const response = await axios.get(`${PUBLIC_BASE_URL}/api/v2/album/recommended`);
            return response.data.data;
        },
        queryKey : ["recommended-albums"]
    });
    
    if (error) {
        return null;
    }

    if (isPending) {
        return null;
    }

    return (
        <View className="flex flex-col gap-y-6 pt-10">
            <Text className="text-white font-bold text-2xl block">
                Recommended Albums
            </Text>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                renderItem={({ item, index })=>(
                    <Card   album={item} key={index} />
                )}
            />
        </View>
    )
}
