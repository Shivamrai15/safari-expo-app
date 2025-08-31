import { Button } from '@/components/button';
import { useAuth } from '@/hooks/use-auth';
import { router } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {

    const { user, setUser } = useAuth();

    return (
        <SafeAreaView className="bg-background flex-1">
            <Text className="text-white">Search</Text>
            <Button
                variant='secondary'
                onPress={() => router.push("/(tabs)/liked-songs")}
            >
                <Text className="text-white">
                    Liked Songs
                </Text>
            </Button>
        </SafeAreaView>
    );
}

export default Search;