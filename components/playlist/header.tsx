import { Image } from 'expo-image';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ShuffleButton } from '../song/shuffle-button';
import { PlayButton } from './play-button';
import { Button } from '../ui/button';
import { router } from 'expo-router';


interface Props {
    name: string;
    image?: string;
    songCount: number;
    id : string;
    color?: string;
}

export const Header = ({ name, image, songCount, id, color="#242424" }: Props) => {
    return (
        <LinearGradient
            colors={[color, '#111111']}
            locations={[0.4, 0.3]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={{
                width: '100%',
            }}  
        >
            <View className="p-10">
                <View className="flex flex-col items-center">
                    <View className="relative shrink-0 aspect-square h-44 w-44 overflow-hidden rounded-lg">
                        <Image
                            source={image ? { uri: image } : require("@/assets/images/playlist.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit : "cover"
                            }}
                        />
                    </View>
                    <View className="flex flex-col gap-y-2 mt-4 text-center">
                        <Text className="text-white text-center text-4xl font-extrabold line-clamp-1 py-1 overflow-hidden">
                            {name}
                        </Text>
                        <View className="flex flex-row items-center justify-center">
                            <Text className="text-white font-semibold">
                                {songCount} Songs
                            </Text>
                        </View>
                        <View className="flex flex-row justify-center items-center gap-4 pt-2">
                            <PlayButton
                                playlistId={id}
                            />
                            <ShuffleButton />
                            <Button
                                className='h-12 rounded-full w-fit px-4'
                                onPress={() => router.push({
                                    pathname : "/[playlistId]",
                                    params : {
                                        playlistId : id as string
                                    }
                                })}
                                variant='secondary'
                            >
                                <Image
                                    source={require('@/assets/icons/add-circle.png')}
                                    style={{ width: 20, height: 20 }}
                                    contentFit='contain'
                                />
                                <Text className='font-semibold text-white'>
                                    Add
                                </Text>
                            </Button>
                            <Button
                                className='h-12 rounded-full w-fit px-4'
                                variant='secondary'
                            >
                                <Image
                                    source={require('@/assets/icons/pen-clip.png')}
                                    style={{ width: 14, height: 14 }}
                                    contentFit='contain'
                                />
                                <Text className='font-semibold text-white'>
                                    Edit
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}