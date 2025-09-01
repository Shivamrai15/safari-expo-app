import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

interface Props {
    name : string;
    image : string;
    thumbnail : string|null|undefined;
}

export const Header = ({ name, image, thumbnail }: Props) => {

    if (thumbnail) {
        return (
            <View className="w-full aspect-video relative">
                <ImageBackground
                    source={{
                        uri : thumbnail
                    }}
                    style={{
                        height : "100%",
                        width : "100%"
                    }}
                >
                    <View className="absolute inset-0">
                        <LinearGradient
                            colors={['transparent', '#111111']}
                            style={{ 
                                height: '100%',
                                width: '100%',
                            }}  
                        >
                            <View className="flex-1 flex justify-end p-4">
                                <Text 
                                    className="text-white text-4xl font-extrabold"
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {name}
                                </Text>
                            </View>
                        </LinearGradient>
                    </View>
                </ImageBackground>
            </View>
        )
    } 

    return (
        <View className="w-full relative p-4">
            <Text 
                className="text-white text-4xl font-extrabold"
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {name}
            </Text>
        </View>
    )
}