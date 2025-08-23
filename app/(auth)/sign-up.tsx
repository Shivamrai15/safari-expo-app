import axios from 'axios';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View
} from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import GoogleOauth from '@/ui/auth/google-oauth';
import { AUTH_BASE_URL } from '@/constants/api.config';

const SignUp = () => {

    const [form, setForm] = useState({
        name : "",
        email : "",
        password : ""
    });

    const { mutate, isPending } = useMutation({
        mutationFn : async(data: { name: string; email: string; password: string; })=> {
            const response = await axios.post(`${AUTH_BASE_URL}/api/auth/register`, data);
            return response.data;
        },
        // TODO add toast notifications
        onSuccess(data) {
            alert("User registered successfully! Please sign in.");
        },
        onError(error) {
            console.error("Error registering user:", error);
            alert("Error registering user. Please try again.");
        },
    });

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView className='size-full bg-neutral-900' keyboardShouldPersistTaps='handled'>
                <View className='my-20 p-6 flex flex-col gap-y-12'>
                    <View className='flex flex-col'>
                        <Text className='text-white text-3xl font-extrabold'>Create Your</Text>
                        <Text className='text-white text-3xl font-extrabold'>Safari Account</Text>
                    </View>
                    <View className='flex flex-col gap-y-6'>
                        <Input
                            label='Your Name'
                            value={form.name}
                            onChange={(text) => setForm({ ...form, name: text })}
                            keyboardType='default'
                        />
                        <Input
                            label='Your Email'
                            value={form.email}
                            onChange={(text) => setForm({ ...form, email: text })}
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
                            <Text className='text-white text-lg font-semibold'>Create Account</Text>
                        </Button>
                        <Link href='/(auth)/sign-in'>
                            <Text className='text-white font-medium'>Already have an account? Sign in</Text>
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

export default SignUp;