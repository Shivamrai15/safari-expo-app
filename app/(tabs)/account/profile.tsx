import { Image } from 'expo-image';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/use-auth';
import { NetworkProvider } from '@/providers/network.provider';

const Profile = () => {

    const { user } = useAuth();

    return (
        <NetworkProvider>    
            <SafeAreaView className='flex-1 bg-background'>
                <ScrollView 
                    className='flex-1 p-4'
                >
                    <View className='flex flex-row items-center gap-x-6'>
                        <View className='size-40 rounded-full overflow-hidden'>
                            <Image
                                source={ user?.user?.image ? { uri: user?.user.image } : require('@/assets/images/user.png')}
                                style={{ height:"100%", width:"100%"}}   
                            />
                        </View>
                        <View className='flex flex-col gap-y-2'>
                            <Text className='text-white text-3xl font-extrabold'>
                                {user?.user?.name}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </NetworkProvider>
    )
}

export default Profile