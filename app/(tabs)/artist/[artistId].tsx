import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const ArtistPage = () => {

    const { artistId } = useLocalSearchParams();

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="w-full flex-1">
                

            </ScrollView>
        </SafeAreaView>
    )
}

export default ArtistPage;

