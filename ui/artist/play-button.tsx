import { Button } from "@/components/button"
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
            {
                isPlaying ?
                <Image source={PauseDarkIcon} style={{ width: 22, height: 22 }} />
                : <Image source={PlayDarkIcon} style={{ width: 20, height: 20 }} />
            }
        </Button>
    )
}