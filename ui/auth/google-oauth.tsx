import { Text } from "react-native";
import { Button } from "@/components/button";
import AntDesign from '@expo/vector-icons/AntDesign';

const GoogleOauth = () => {
    return (
        <Button
            variant="secondary"
        >
            <AntDesign name="google" size={16} color="white" />
            <Text className="text-white font-semibold">Continue with Google</Text>
        </Button>
    )
}

export default GoogleOauth;
