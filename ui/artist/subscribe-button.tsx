import { Text } from "react-native";
import { Button } from "@/components/button";




export const SubscribeButton = () => {
    return (
        <Button
            variant="outline"
            className="px-4 rounded-full"
        >
            <Text className="text-white font-semibold">Subscribe</Text>
        </Button>
    )
}
