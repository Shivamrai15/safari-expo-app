import axios from "axios";
import { useState } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { PauseDarkIcon, PlayDarkIcon } from "@/constants/icons";
import { Album, Artist, Song } from "@/types/response.types";
import { useAuth } from "@/hooks/use-auth";


interface Props {
    songs? : (Song & {
        album : Album,
        artists : Artist[]
    })[];
    id? : string;
    className? : string
}

export const PlayButton = ({ songs, id, className }: Props) => {
    
    const { isLoggedIn, user } = useAuth();
    const [isPlaying, setIsPlaying] = useState(false);
    
    const handlePlay = async () => {
        if (!isLoggedIn){
            router.push("/(auth)/welcome");
            return;
        } else {
            if (songs && songs.length > 0) {
                setIsPlaying(true);
            } else {
                // const songs = await axios.get()
            }
        }
    }

    return (
        <Button
            className={cn(
                "rounded-full size-12",
                className
            )}
            onPress={() => handlePlay()}
        >
            {
                isPlaying ?
                <Image source={PauseDarkIcon} style={{ width: 22, height: 22 }} />
                : <Image source={PlayDarkIcon} style={{ width: 20, height: 20 }} />
            }
        </Button>
    )
}
