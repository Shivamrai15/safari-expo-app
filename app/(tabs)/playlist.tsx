import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Playlist = () => {
  return (
    <SafeAreaView className="flex-1 bg-background flex items-center justify-end">
      <Text className="text-white">Playlist</Text>
    </SafeAreaView>
  );
}

export default Playlist;