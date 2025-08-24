import { Image } from 'expo-image';
import { Button } from '@/components/button';
import { ShuffleIcon } from '@/constants/icons';

export const ShuffleButton = () => {
    return (
        <Button
            className="rounded-full size-14"
            variant='ghost'
        >
            <Image source={ShuffleIcon} style={{ width: 32, height: 32 }} />
        </Button>
    )
}
