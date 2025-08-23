import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  return (
    <SafeAreaView className='bg-background flex-1'>
        <Text className='text-white'>Sign Up</Text>
        <Link href="/(auth)/sign-in">
            <Text style={{ color: 'white' }}>Sign In</Text>
        </Link>
    </SafeAreaView>
  )
}

export default SignUp;