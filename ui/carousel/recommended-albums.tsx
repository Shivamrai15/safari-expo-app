import { FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query"
import { Card } from "../album/card";
import { fetcher } from "@/lib/fetcher";


export const RecommendedAlbums = () => {

    const { data, isPending, error } = useQuery({
        queryFn : async()=>{
            const data = await fetcher({
                prefix : "PUBLIC_BASE_URL",
                suffix : "api/v2/album/recommended"
            });
            return data.data;
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
