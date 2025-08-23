import { Redirect } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {

    return (
        <Redirect href="/(tabs)/home" />
    )
}

export default Index;
