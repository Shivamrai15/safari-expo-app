import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { useSettingsSync } from '@/hooks/use-settings';
import { useLikedSongsSync } from '@/hooks/use-liked-songs';

const Index = () => {

    const { isLoggedIn, user } = useAuth();
    useSettingsSync(user?.token);
    useLikedSongsSync(user?.token);

    if (isLoggedIn) {
        return <Redirect href="/(tabs)/home" />;
        // return <Redirect href="/(tabs)/account/delete-history" />;
    }
    
    return (
        <Redirect href="/(auth)/welcome" />
    )
}

export default Index;
