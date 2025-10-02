import { useAuth } from '@/hooks/use-auth';
import { useSettingsSync } from '@/hooks/use-settings';
import { Redirect } from 'expo-router';

const Index = () => {

    const { isLoggedIn, user } = useAuth();
    useSettingsSync(user?.token)

    if (isLoggedIn) {
        return <Redirect href="/(tabs)/home" />;
        // return <Redirect href="/(tabs)/account/delete-history" />;
    }
    
    return (
        <Redirect href="/(auth)/welcome" />
    )
}

export default Index;
