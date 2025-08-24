import { Button } from "@/components/button";
import { useAuth } from "@/hooks/use-auth";
import { RecommendedAlbums } from "@/ui/carousel/recommended-albums";
import TrendingSongs from "@/ui/carousel/trending-songs";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {

    const { user, isLoggedIn, setUser } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="p-6 pt-10 pb-20">
                {
                    isLoggedIn ? (
                        <View className="flex flex-row justify-end gap-x-4 h-28">
                            <Button
                                onPress={() => {
                                    setUser(null);
                                }}
                            >
                                <Text className="font-semibold text-lg">Logout</Text>
                            </Button>
                        </View>
                    ) : (
                        <View className="flex flex-row justify-end gap-x-4 h-28">
                            <Button
                                variant="ghost"
                                onPress={()=>router.push("/(auth)/sign-in")}
                            >
                                <Text className="font-semibold text-lg text-white">Log in</Text>
                            </Button>
                            <Button
                                className="rounded-full px-5"
                                onPress={()=>router.push("/(auth)/sign-up")}
                            >
                                <Text className="font-semibold text-lg">Sign Up</Text>
                            </Button>
                        </View>
                    )
                }
                <TrendingSongs />
                <RecommendedAlbums />
                <View className="h-40" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;