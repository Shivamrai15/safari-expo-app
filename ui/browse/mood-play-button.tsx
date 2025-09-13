import { Image } from 'expo-image';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/button';
import { PauseDarkIcon, PlayDarkIcon } from '@/constants/icons';

interface Props {
    id : string;
    className? : string;
}

export const MoodPlayButton = ({ id, className }: Props) => {

    const { isLoggedIn, user } = useAuth();
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