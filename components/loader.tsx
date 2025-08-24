import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Loader = () => {
    return (
        <SafeAreaView className="flex-1 bg-background flex justify-center items-center">
            <ActivityIndicator size="large" color="#363636" />
        </SafeAreaView>
    )
}

export default Loader;
