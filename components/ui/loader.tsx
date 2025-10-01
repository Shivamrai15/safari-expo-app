import { cn } from "@/lib/utils";
import LottieView from 'lottie-react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    className?: string;
}

export const PrimaryLoader = ({ className }: Props) => {
    return (
        <SafeAreaView className={cn(
            "flex-1 bg-background flex justify-center items-center",
            className
        )}>
            <LottieView
                source={require("@/assets/lottie/Cosmos.json")}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
            />
        </SafeAreaView>
    )
}

export const SecondaryLoader = ({ className }: Props) => {
    return (
        <SafeAreaView className={cn(
            "flex-1 bg-background flex justify-center items-center",
            className
        )}>
            <LottieView
                source={require("@/assets/lottie/Loading Spinner (Dots).json")}
                autoPlay
                loop
                style={{ width: 150, height: 150 }}
            />
        </SafeAreaView>
    )
}
