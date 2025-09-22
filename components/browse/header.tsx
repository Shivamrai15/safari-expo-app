import { Image } from 'expo-image';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShuffleButton } from '../song/shuffle-button';
import { MoodPlayButton } from './mood-play-button';
import { GenrePlayButton } from './genre-play-button';

interface Props {
    id : string;
    type : "mood" | "genre";
    name : string;
    songCount : number;
    image : string;
    color : string;
}

export const Header = ({ id, type, name, songCount, image, color }: Props) => {
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
                            source={{ uri: image }}
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
                        <View className="flex flex-row justify-center items-center gap-6 pt-2">
                            {
                                type === "mood" ?
                                <MoodPlayButton id={id} />
                                : <GenrePlayButton id={id} />
                            }
                            <ShuffleButton />
                            {/* 
                                TODO :
                                3. Options Button
                            */}
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}