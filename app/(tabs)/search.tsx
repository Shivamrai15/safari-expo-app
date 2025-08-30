import { Button } from '@/components/button';
import { useAuth } from '@/hooks/use-auth';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {

    const { user, setUser } = useAuth();

    return (
        <SafeAreaView className="bg-background flex-1">
            <Text className="text-white">Search</Text>
            <Text className="text-white">
                {user?.token}
            </Text>
        </SafeAreaView>
    );
}

export default Search;