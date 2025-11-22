import { Text } from "react-native";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useArtist } from "@/hooks/use-artist";
import { Artist } from "@/types/response.types";

interface Props {
    artist: Artist;
}

export const SubscribeButton = ({ artist }: Props) => {

    const { user } = useAuth();
    const { isSubscribed, isLoading ,toggleSubscription } = useArtist(artist, user?.tokens.accessToken);

    return (
        <Button
            variant="outline"
            className="px-4 rounded-full"
            disabled={isLoading}
            onPress={() => toggleSubscription()}
        >
            <Text className="font-semibold text-white">{isSubscribed ? "Unsubscribe" : "Subscribe"}</Text>
        </Button>
    )
}
