import { Image } from 'expo-image';
import { Href, router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DownloadIcon, HistoryIcon, PlaylistRecoverIcon, ReceiptIcon, UserIcon } from '@/constants/icons';
import { NetworkProvider } from '@/providers/network.provider';


const Account = () => {

    const routes : { path: Href, name: string, icon: any, height: number, width: number }[] = [
        {
            name : "Your profile",
            path : "/(tabs)/account/profile",
            icon : UserIcon,
            height: 24,
            width: 24
        },
        {
            name : "Delete history",
            path : "/(tabs)/account/delete-history",
            icon : HistoryIcon,
            height: 24,
            width: 24
        },
        {
            name : "Recover playlists",
            path : "/",
            icon : PlaylistRecoverIcon,
            height: 28,
            width: 28
        },
        {
            name : "Transaction history",
            path : "/",
            icon : ReceiptIcon,
            height: 24,
            width: 24
        },
        {
            name : "Downloads",
            path : "/(tabs)/downloads",
            icon : DownloadIcon,
            height: 24,
            width: 24
        }
    ]

    return (
        <NetworkProvider>
            <SafeAreaView className="bg-background flex-1">
                <ScrollView className='flex-1 p-6'>
                    <Text className="text-white text-2xl font-bold">Settings</Text>
                    <View className="w-full mt-10 flex flex-col gap-y-6">
                        {
                            routes.map((route) => (
                                <TouchableOpacity
                                    key={route.name}
                                    onPress={() => router.push(route.path)}
                                    className='flex flex-row gap-x-4'
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={route.icon}
                                        style={{ width: route.width, height: route.height}}
                                    />
                                    <Text className="text-white font-medium text-lg">{route.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </NetworkProvider>
    );
}

export default Account;