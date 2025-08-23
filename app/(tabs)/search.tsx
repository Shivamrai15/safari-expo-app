import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView className="bg-background flex-1">
      <Text className="text-white">Search</Text>
    </SafeAreaView>
  );
}

export default Home;