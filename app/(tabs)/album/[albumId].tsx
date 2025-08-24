import { LinearGradient } from "expo-linear-gradient";
import { AlbumResponse } from "@/types/response.types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "@/components/loader";
import { Header } from "@/ui/album/header";
import { List } from "@/ui/album/list";
import { AlbumLabel } from "@/ui/album/label";
import { fetcher } from "@/lib/fetcher";


const AlbumPage = () => {
    const { albumId } = useLocalSearchParams();

    const { data, isPending, error } = useQuery({
        queryFn : async()=>{
            const data = await fetcher({
                prefix : "PUBLIC_BASE_URL",
                suffix : `api/v2/album/${albumId}`
            });
            return data.data as AlbumResponse;
        },
        queryKey: ["album", albumId]
    });


    if (isPending) {
        return <Loader />;
    }

    if (!data || error) {
        return null;
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="w-full flex-1">
                <LinearGradient
                    colors={['#111111', `${data.color}5a`]}
                    locations={[0.8, 1.0]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1 }}
                >
                    <Header data={data} />
                    <List data={data.songs} />
                    {
                        data?.label && (
                            <AlbumLabel label={data.label} releaseDate={data.release} />
                        )
                    }
                    <View className="h-20" />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AlbumPage;
