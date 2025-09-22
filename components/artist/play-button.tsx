import { Button } from "@/components/ui/button"
import { PauseDarkIcon, PlayDarkIcon } from "@/constants/icons";
import { cn } from "@/lib/utils"
import { Image } from "expo-image";

interface Props {
    className? : string
}

export const PlayButton = ({ className }: Props) => {

    const isPlaying = false;

    return (
        <Button
            className={cn(
                "rounded-full size-12",
                className
            )}
        >
            <Image source={isPlaying ? PauseDarkIcon : PlayDarkIcon} style={{ width: 22, height: 22 }} />
        </Button>
    )
}