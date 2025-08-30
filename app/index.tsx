import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'expo-router';

const Index = () => {

    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Redirect href="/(tabs)/home" />;
    }
    return (
        <Redirect href="/(auth)/welcome" />
    )
}

export default Index;
