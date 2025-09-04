import { Image } from "expo-image";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Loader = () => {
    return (
        <SafeAreaView className="flex-1 bg-background flex justify-center items-center">
            <View
                className="size-10 animate-spin"
            >
                <Image
                    source={require('@/assets/icons/spinner.png')}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="contain"
                />
            </View>
        </SafeAreaView>
    )
}

export default Loader;
