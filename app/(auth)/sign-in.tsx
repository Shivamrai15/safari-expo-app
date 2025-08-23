import axios from 'axios';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { 
    View,
    Text,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import GoogleOauth from '@/ui/auth/google-oauth';
import { useMutation } from '@tanstack/react-query';
import { AUTH_BASE_URL } from '@/constants/api.config';

const SignIn = () => {

    const [form, setForm] = useState({
        email : "",
        password : ""
    });

    const { mutate, isPending } = useMutation({
        mutationFn : async(data: { email: string; password: string; })=> {
            const response = await axios.post(`${AUTH_BASE_URL}/api/auth/login`, data);
            return response.data;
        },
        // TODO add toast notifications
        onSuccess(data) {
            alert("User logged in successfully!");
            console.log("User logged in successfully:", data);
            router.replace("/(tabs)/home")
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                alert(`Error logging in user: ${error.response?.data?.message || error.message}`);
            }
        },
    });

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView className='size-full bg-neutral-900' keyboardShouldPersistTaps='handled'>
                <View className='my-20 p-6 flex flex-col gap-y-12'>
                    <View className='flex flex-col'>
                        <Text className='text-white text-3xl font-extrabold'>Login to your</Text>
                        <Text className='text-white text-3xl font-extrabold'>Safari Account</Text>
                    </View>
                    <View className='flex flex-col gap-y-6'>
                        <Input
                            value={form.email}
                            onChange={(text) => setForm({ ...form, email: text })}
                            label='Your Email'
                            keyboardType='email-address'
                        />
                        <Input
                            label='Your Password'
                            value={form.password}
                            onChange={(text) => setForm({ ...form, password: text })}
                            keyboardType='default'
                            secureTextEntry={true}
                        />
                        <Button
                            className='bg-red-600 rounded-full'
                            disabled={isPending}
                            onPress={() => mutate(form)}
                        >
                            <Text className='text-white text-lg font-semibold'>Continue</Text>
                        </Button>
                        <Link href='/(auth)/sign-up'>
                            <Text className='text-white font-medium'>Don't have an account? Sign Up</Text>
                        </Link>
                    </View>
                    <View className='relative'>
                        <View className='h-px bg-zinc-700'/>
                        <Text className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 px-2 text-zinc-300 rounded-sm text-sm font-semibold cursor-default select-none'>
                            Or
                        </Text>
                    </View>
                    <GoogleOauth />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignIn;
