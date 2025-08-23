import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="bg-background flex-1">
      <Text className="text-white">Home</Text>
      <Link href="/(auth)/welcome">
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </Link>
    </SafeAreaView>
  );
};

export default Home;
