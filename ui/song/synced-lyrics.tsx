import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Pressable } from 'react-native';
import { cn } from "@/lib/utils";

interface Props {
    position: number;
    onSeek: (value: number) => void;
    lyrics : {
        time: number;
        text: string;
    }[];
}

export const SyncedLyrics = ({ position, onSeek, lyrics }: Props) => {
    const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);
    const lyricsContainerRef = useRef<ScrollView | null>(null);

    // useEffect(() => {
    //     if (lyrics.length > 0 && position >= 0) {
    //         const nextLineIndex = lyrics.findIndex(line => line.time > position) - 1;

    //         if (nextLineIndex !== currentLineIndex && nextLineIndex >= 0) {
    //             setCurrentLineIndex(nextLineIndex);
                
    //             // Auto-scroll to current line
    //             if (lyricsContainerRef.current && nextLineIndex >= 0) {
    //                 const lineHeight = 70;
    //                 const scrollOffset = Math.max(0, (nextLineIndex - 2) * lineHeight);
                    
    //                 setTimeout(() => {
    //                     lyricsContainerRef.current?.scrollTo({
    //                         y: scrollOffset,
    //                         animated: true
    //                     });
    //                 }, 100);
    //             }
    //         }
    //     }
    // }, [lyrics, position]);

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <ScrollView
                ref={lyricsContainerRef}
                style={{ flex: 1 }}
                contentContainerStyle={{ 
                    paddingVertical: 100,
                    paddingHorizontal: 16,
                }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                bounces={true}
                decelerationRate="normal"
            >
                {lyrics.map((line, index) => (
                    <Pressable
                        key={index}
                        onPress={() => onSeek(line.time)}
                        style={{ 
                            paddingVertical: 16,
                            paddingHorizontal: 8,
                            minHeight: 70,
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            className={cn(
                                "text-2xl font-bold text-left leading-8",
                                index === currentLineIndex ? 'text-white' : 'text-gray-400'
                            )}
                            style={{
                                opacity: index === currentLineIndex ? 1 : 0.5,
                            }}
                        >
                            {line.text === "" ? "♪" : line.text}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}