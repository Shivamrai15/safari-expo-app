import { useState } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SearchList } from '@/ui/playlist/search-list';
import { SearchIcon } from '@/constants/icons';

const PlaylistSearch = () => {

    const { playlistId } = useLocalSearchParams();
    const [ query, setQuery ] = useState("");
    const [ selectedSongId, setSelectedSongId ] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        if (selectedSongId.includes(id)) {
            setSelectedSongId(prev => prev.filter(item => item !== id));
        } else {
            setSelectedSongId(prev => [...prev, id]);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-background'>
            <LinearGradient
                colors={['#012d36', 'transparent']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.3]}
                style={{ flex: 1 }}
            >
                <ScrollView
                    className='flex-1'
                >
                    <View className='p-6'>
                        <View className='flex flex-row items-center bg-neutral-800 rounded-full px-4 py-3'>
                            <Image
                                source={SearchIcon}
                                style={{ width: 26, height: 26 }}
                            />
                            <TextInput
                                placeholder="Search songs"
                                placeholderTextColor="#9CA3AF"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={query}
                                onChangeText={(text) => setQuery(text)}
                                keyboardType="default"
                                style={{
                                    backgroundColor: 'transparent',
                                    borderRadius: 6,
                                    borderWidth: 0,
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    height: 40,
                                    color: '#f4f4f5',
                                    fontWeight: '500',
                                    flex: 1
                                }}
                            />
                        </View>
                    </View>
                    <View className='px-6'>
                        {
                            query && 
                            <SearchList
                                query={query}
                                toggleSelect={toggleSelect}
                                selectedSongId={selectedSongId}
                            />
                        }
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default PlaylistSearch;