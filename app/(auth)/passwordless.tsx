import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PasswordLess = () => {

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(true);
    const [code, setCode] = useState('');


    if (pendingVerification) {
        return (
            <SafeAreaView className='size-full bg-background'>
                <View className='my-20 p-6 flex flex-col gap-y-12'>
                    <View className='flex flex-col'>
                        <Text className='text-white text-3xl font-extrabold'>Verify your email</Text>
                    </View>
                    <View className='flex flex-col gap-y-6'>
                        <Input
                            value={code}
                            onChange={(text) => setCode(text)}
                            label='Verification Code'
                            keyboardType='phone-pad'
                        />
                        <Button
                            className='bg-red-600 rounded-full'
                        >
                            <Text className='text-white text-lg font-semibold'>Verify</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView className='size-full bg-background'> 
            <View className='my-20 p-6 flex flex-col gap-y-12'>
                <View className='flex flex-col'>
                    <Text className='text-white text-3xl font-extrabold'>Tune In to Safari</Text>
                    <Text className='text-white text-3xl font-extrabold'>with One-Tap Login</Text>
                </View>
                <View className='flex flex-col gap-y-6'>
                    <View className='flex flex-col gap-y-6'>
                        <Input
                            value={emailAddress}
                            onChange={(text) => setEmailAddress(text)}
                            label='Your Email'
                            keyboardType='email-address'
                        />
                        <Button
                            className='bg-red-600 rounded-full'
                            // disabled={isPending}
                            // onPress={() => mutate(form)}
                        >
                            <Text className='text-white text-lg font-semibold'>Continue</Text>
                        </Button>
                        <Link href='/(auth)/sign-up'>
                            <Text className='text-white font-medium'>Don&apos;t have an account? Sign Up</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PasswordLess