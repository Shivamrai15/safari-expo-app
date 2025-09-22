import { Image } from 'expo-image';
import { Button } from '@/components/ui/button';
import { ShuffleIcon } from '@/constants/icons';
import { useQueue } from '@/hooks/use-queue';

export const ShuffleButton = () => {
    
    const { shuffle } = useQueue();
    
    return (
        <Button
            className="rounded-full size-14"
            variant='ghost'
            onPress={()=>shuffle()}
        >
            <Image source={ShuffleIcon} style={{ width: 32, height: 32 }} />
        </Button>
    )
}
