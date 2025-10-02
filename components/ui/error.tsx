import { cn } from '@/lib/utils';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    className? : string;
}

export const Error = ({ className }: Props) => {
    return (
        <SafeAreaView className={cn(
            "flex-1 bg-background items-center justify-center flex", className
        )}>
            <Text className="text-center text-zinc-200">
                Something went wrong
            </Text>
        </SafeAreaView>
    )
}