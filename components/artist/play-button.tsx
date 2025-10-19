import { Image } from "expo-image";
import { Button } from "@/components/ui/button"
import { PauseDarkIcon, PlayDarkIcon } from "@/constants/icons";
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth";
import { usePlayer } from "@/hooks/use-player";
import { useArtistSongs } from "@/hooks/use-artist";

interface Props {
    id : string;
    className? : string
}

export const PlayButton = ({ id, className }: Props) => {

    const { user } = useAuth();
    const { isPlaying } = usePlayer();
    const { isCurrentArtist, isLoadingSongs, playArtistSongs } = useArtistSongs(id, user?.token);

    return (
        <Button
            className={cn(
                "rounded-full size-12",
                className
            )}
            disabled={(isCurrentArtist && isPlaying) || isLoadingSongs}
            onPress={() => playArtistSongs()}
        >
            <Image source={isPlaying ? PauseDarkIcon : PlayDarkIcon} style={{ width: 22, height: 22 }} />
        </Button>
    )
}