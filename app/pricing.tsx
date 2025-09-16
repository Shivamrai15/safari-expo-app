import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Pricing = () => {
    return (
        <SafeAreaView className='bg-background flex-1 items-center justify-center'>
            <View>
                <Text className='text-white'>Pricing</Text>
            </View>
        </SafeAreaView>
    )
}

export default Pricing;