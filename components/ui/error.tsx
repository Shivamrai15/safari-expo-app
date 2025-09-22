import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Error = () => {
    return (
        <SafeAreaView className="flex-1 bg-background items-center justify-center flex">
            <Text className="text-center text-zinc-200">
                Something went wrong
            </Text>
        </SafeAreaView>
    )
}