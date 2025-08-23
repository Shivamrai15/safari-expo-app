import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  return (
    <SafeAreaView className='bg-background flex-1'>
        <Text className='text-zinc-200'>
            Welcome Page
        </Text>
        <Link href="/(auth)/sign-up">
            <Text style={{ color: 'white' }}>Get Started</Text>
        </Link>
    </SafeAreaView>
  )
}

export default Welcome;
