import { Image } from 'expo-image';
import { 
    View,
    Text,
    FlatList,
    Platform,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/button';
import { SearchIcon } from '@/constants/icons';
import { useAuth } from '@/hooks/use-auth';
import { Tab } from '@/types/response.types';
import { AllTab } from '@/ui/search/all-tab';
import { AlbumTab } from '@/ui/search/album-tab';
import { ArtistTab } from '@/ui/search/artist-tab';
import { SongTab } from '@/ui/search/song-tab';



const Search = () => {

    const { user, setUser } = useAuth();
    const [ query, setQuery ] = useState("");
    const [currentTab, setCurrentTab] = useState<Tab>("DEFAULT");

    const tabs: Record<Tab, string> = {
        DEFAULT: "All",
        ALBUM: "Albums",
        SONG: "Songs",
        ARTIST: "Artists"
    };

    return (
        <SafeAreaView className="bg-background flex-1">
            <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView className='flex-1 p-4' keyboardShouldPersistTaps='handled'>
                    <View className='flex flex-row items-center bg-neutral-800 rounded-full px-4 py-3'>
                        <Image
                            source={SearchIcon}
                            style={{ width: 26, height: 26 }}
                        />
                        <TextInput
                            placeholder="Search songs, albums and artists"
                            placeholderTextColor="#9CA3AF"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={query}
                            onChangeText={(text) => setQuery(text)}
                            keyboardType="default"
                            className="bg-transparent rounded-md border-none px-3 py-2 h-10 text-zinc-100 font-medium"
                        />
                    </View>
                    <View className='w-full mt-6'>
                        <FlatList
                            data={Object.entries(tabs)}
                            keyExtractor={([key]) => key}
                            renderItem={({ item: [key, label] }) => (
                                <Button
                                    variant={currentTab === key ? "primary" : "secondary"}
                                    onPress={() => setCurrentTab(key as Tab)}
                                    className='rounded-full px-4 h-10'
                                >
                                    <Text className={cn(
                                        "font-medium",
                                        currentTab === key ? "text-zinc-900" : "text-zinc-200"
                                    )}>
                                        {label}
                                    </Text>
                                </Button>
                            )}
                            horizontal
                            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    {
                        currentTab === "DEFAULT" && query && <AllTab currentTab={currentTab} query={query} />
                    }
                    {
                        currentTab === "ALBUM" && query && <AlbumTab currentTab={currentTab} query={query} />
                    }
                    {
                        currentTab === "ARTIST" && query && <ArtistTab currentTab={currentTab} query={query} />
                    }
                    {
                        currentTab === "SONG" && query && <SongTab currentTab={currentTab} query={query} />
                    }
                    <View className='h-40'/>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Search;