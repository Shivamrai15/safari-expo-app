import { useDownloads } from '@/hooks/use-downloads';
import { SongResponse } from '@/types/response.types';
import { SongItem } from '@/ui/song/item';
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const Download = () => {

    const { songs } = useDownloads();

    console.log(JSON.stringify(songs, null, 2));

    return (
        <SafeAreaView className='bg-background flex-1'>
            <ScrollView className='flex-1 p-6'>
                <Text className='text-2xl font-bold text-white mb-4'>Downloads</Text>
                {songs.map(song => (
                    <Text key={song.id} className='text-white mb-2'>
                        {song.name}
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Download;