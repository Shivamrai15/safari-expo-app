import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Playlist = () => {
  return (
    <SafeAreaView className="bg-background flex-1">
      <Text className="text-white">Playlist</Text>
    </SafeAreaView>
  );
}

export default Playlist;