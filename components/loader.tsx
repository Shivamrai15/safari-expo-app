import { cn } from "@/lib/utils";
import { Image } from "expo-image";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    className?: string;
}

const Loader = ({ className }: Props) => {
    return (
        <SafeAreaView className={cn(
            "flex-1 bg-background flex justify-center items-center",
            className
        )}>
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
