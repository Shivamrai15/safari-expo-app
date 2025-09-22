import { router, usePathname } from 'expo-router';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";

import { Button } from '@/components/ui/button';

interface Props {
    children: React.ReactNode;
}

export const NetworkProvider = ({ children }: Props) => {

    const pathname = usePathname();
    const [isConnected, setIsConnected] = useState<boolean | null>(true);


    useEffect(()=>{
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        }
    }, [pathname]);

    if (!isConnected && pathname !== "/downloads") {
        return (
            <SafeAreaView className='flex-1 bg-background items-center justify-center'>
                    <View className='flex flex-col items-center justify-center gap-y-5'>
                        <Text className='text-2xl font-bold text-white'>No internet connection</Text>
                        <Text className='text-sm text-gray-400 text-center'>Please check your network settings and try again.</Text>
                        <Button
                            variant='primary'
                            onPress={() => router.replace("/(tabs)/downloads")}
                            className='rounded-full px-6 py-3'
                        >
                            <Text className='text-zinc-800 font-semibold'>Downloads</Text>
                        </Button>
                    </View>
            </SafeAreaView>
        )
    }

    return children;

};