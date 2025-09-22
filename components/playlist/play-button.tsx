import { Image } from 'expo-image';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PauseDarkIcon, PlayDarkIcon } from '@/constants/icons';


interface Props {
    className? : string;
    playlistId? : string;
}

export const PlayButton = ({ className, playlistId }: Props) => {
    
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