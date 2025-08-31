import { router } from "expo-router";
import { Image } from "expo-image";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueries } from "@tanstack/react-query";

import { useAuth } from "@/hooks/use-auth";
import { fetcher } from "@/lib/fetcher";
import { Error } from "@/components/error";
import Loader from "@/components/loader";
import { AlbumCarousel } from "@/ui/carousel/album";
import { TrendingSongs } from "@/ui/carousel/trending-songs";
import { Button } from "@/components/button";
import { ListenAgainCarousel } from "@/ui/carousel/listen-again";
import { ArtistCarousel } from "@/ui/carousel/artist";

const Home = () => {
    const { user, setUser } = useAuth();

    const [ trendingSongs, recommendedAlbums, newAlbums, listenAgainSongs, favoriteArtists ] = useQueries({
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
            },
            {
                queryFn : async()=>{
                    const data = await fetcher({
                        prefix : "PROTECTED_BASE_URL",
                        suffix : "api/v2/song/listen-again",
                        token : user?.token
                    });
                    return data.data;
                },
                queryKey : ["listen-again"]
            },
            {
                queryFn : async()=>{
                    const data = await fetcher({
                        prefix : "PROTECTED_BASE_URL",
                        suffix : "api/v2/artist/favorites",
                        token : user?.token
                    });
                    return data.data;
                },
                queryKey : ["favorite-artists"]
            }
        ]
    });

    if (trendingSongs.isLoading || recommendedAlbums.isLoading || newAlbums.isLoading || listenAgainSongs.isLoading || favoriteArtists.isLoading) {
        return <Loader />;
    }

    if (trendingSongs.error || recommendedAlbums.error || newAlbums.error || listenAgainSongs.error || favoriteArtists.error) {
        return (
            <Error />
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="p-4 pt-10 pb-20">
                <View className="flex flex-row items-center justify-end gap-x-6">
                    <Button
                        className="px-4 rounded-full"
                        onPress={()=>{
                            setUser(null);
                            router.replace("/(auth)/sign-in")
                        }}
                    >
                        <Text className="font-bold">Logout</Text>
                    </Button>
                </View>
                <View className="flex flex-row items-center gap-x-6 mt-16">
                    <Image
                        source={ user?.user?.image ? { uri: user?.user.image } : require('@/assets/images/user.png') }
                        style={{ height: 72, width: 72, borderRadius: "100%" }}
                    />
                    <View className="flex flex-col gap-y-0.5">
                        <Text className="text-xl font-bold text-zinc-400">{user?.user.name}</Text>
                        <Text className="text-3xl text-white font-extrabold">Listen Again</Text>
                    </View>
                </View>
                <View className="pt-10 flex flex-col gap-y-4">
                    <TouchableOpacity
                        onPress={() => router.push("/(tabs)/liked-songs")}
                        className="w-full flex flex-row items-center gap-x-4 bg-neutral-800 rounded-md overflow-hidden"
                        activeOpacity={0.7}
                    >
                        <Image
                            source={require('@/assets/images/liked-thumb.png')}
                            style={{ width: 56, height: 56 }}
                            contentFit="contain"
                        />
                        <Text className="text-lg font-semibold text-white">
                            Liked Songs
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push("/(tabs)/browse")}
                        className="w-full flex flex-row items-center gap-x-4 bg-neutral-800 rounded-md overflow-hidden"
                        activeOpacity={0.7}
                    >
                        <Image
                            source={require('@/assets/images/history.avif')}
                            style={{ width: 56, height: 56 }}
                            contentFit="contain"
                        />
                        <Text className="text-lg font-semibold text-white">
                            History
                        </Text>
                    </TouchableOpacity>
                </View>
                <ListenAgainCarousel
                    data={listenAgainSongs.data}
                />
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
                <ArtistCarousel
                    data={favoriteArtists.data}
                    slug="Your favorite artists"
                />
                <View className="h-40" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;