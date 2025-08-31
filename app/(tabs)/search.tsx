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
                onPress={() => router.push({
                    pathname : "/(tabs)/artist-songs/[artistId]",
                    params : {
                        artistId : "65f4859bb0b9f038aaccce75"
                    }
                })}
            >
                <Text className="text-white">
                    Artist
                </Text>
            </Button>
        </SafeAreaView>
    );
}

export default Search;