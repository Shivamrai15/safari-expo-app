import { Button } from '@/components/button';
import { cn } from '@/lib/utils';
import { NetworkProvider } from '@/providers/network.provider';
import { Genre } from '@/ui/browse/genre';
import { Moods } from '@/ui/browse/moods';
import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type tab = "genre" | "mood";

const Browse = () => {

    const [ activeTab, setActiveTab ] = useState<tab>("genre");
    const [atEnd, setAtEnd] = useState(false);
    
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // buffer of 20px
        setAtEnd(isEnd);
    };

    return (
        <NetworkProvider>
            <SafeAreaView className="bg-background flex-1">
                <ScrollView
                    className='flex-1'
                    stickyHeaderIndices={[0]}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <View className='flex flex-row items-center gap-x-4 p-4 bg-background'>
                        <Button 
                            variant={activeTab === "genre" ? "primary" : "secondary"}
                            className="rounded-full px-4 h-10"
                            onPress={()=>setActiveTab("genre")}
                        >
                            <Text
                                className={cn(
                                    "font-semibold",
                                    activeTab === "genre" ? "text-zinc-900" : "text-zinc-300"
                                )}
                            >
                                Genre
                            </Text>
                        </Button>
                        <Button
                            variant={activeTab === "mood" ? "primary" : "secondary"}
                            className="rounded-full px-4 h-10"
                            onPress={()=>setActiveTab("mood")}
                        >
                            <Text
                                className={cn(
                                    "font-semibold",
                                    activeTab === "mood" ? "text-zinc-900" : "text-zinc-300"
                                )}
                            >
                                Moods
                            </Text>
                        </Button>
                    </View>
                    <View className='mt-10 px-4'>
                        {
                            activeTab === "genre" ? (
                                <Genre />
                            ) : (
                                <Moods isAtEnd={atEnd} />
                            )
                        }
                    </View>
                    <View className='h-20' />
                </ScrollView>
            </SafeAreaView>
        </NetworkProvider>
    );
}

export default Browse;