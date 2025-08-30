import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueries } from "@tanstack/react-query";

import { useAuth } from "@/hooks/use-auth";
import { fetcher } from "@/lib/fetcher";
import { Error } from "@/components/error";
import Loader from "@/components/loader";
import { AlbumCarousel } from "@/ui/carousel/album";
import { TrendingSongs } from "@/ui/carousel/trending-songs";

const Home = () => {
    const { user, isLoggedIn } = useAuth();
    
    const [ trendingSongs, recommendedAlbums, newAlbums ] = useQueries({
        queries:[
            {
                queryFn : async()=>{
                    const data = await fetcher({
                        prefix : "PUBLIC_BASE_URL",
                        suffix : "api/v2/song/trending",
                        token : user?.token
                    });
                    return data.items;
                },
                queryKey : ["trending-songs"]
            },
            {
                queryFn : async()=>{
                    const data = await fetcher({
                        prefix : "PUBLIC_BASE_URL",
                        suffix : "api/v2/album/recommended",
                        token : user?.token
                    });
                    return data.data;
                },
                queryKey : ["recommended-albums"]
            },
            {
                queryFn : async()=>{
                    const data = await fetcher({
                        prefix : "PUBLIC_BASE_URL",
                        suffix : "api/v2/album/new",
                        token : user?.token
                    });
                    return data.data;
                },
                queryKey : ["new-albums"]
            }
        ]
    });

    if (trendingSongs.isLoading || recommendedAlbums.isLoading || newAlbums.isLoading) {
        return <Loader />;
    }

    if (trendingSongs.error || recommendedAlbums.error || newAlbums.error) {
        return (
            <Error />
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="p-6 pt-10 pb-20">
                <TrendingSongs
                    data={trendingSongs.data}
                />
                <AlbumCarousel
                    data={newAlbums.data}
                    slug="New Releases"
                />
                <AlbumCarousel
                    data={recommendedAlbums.data}
                    slug="Recommended Albums"
                />
                <View className="h-40" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;