import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'expo-router';

const Index = () => {

    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        // return <Redirect href="/(tabs)/home" />;
        return <Redirect href={{
            pathname: "/(tabs)/mood-songs/[moodId]",
            params : {
                moodId: "68316dc4050e6023f992d1a7"
            }
        }} />;
    }
    return (
        <Redirect href="/(auth)/welcome" />
    )
}

export default Index;
