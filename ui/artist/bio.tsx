import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";


interface Props {
    image : string;
    description : string;
}

export const BioCard = ({ image, description }: Props) => {
    return (
        <Pressable 
            className="mx-4 p-4 rounded-lg bg-neutral-800 shadow-xl mt-10"
        >
            <View className="size-28 rounded-full overflow-hidden relative">
                <Image
                    source={{
                        uri : image
                    }}
                    style={{ width : "100%", height : "100%" }}
                />
            </View>
            <Text 
                className="text-white mt-6"
                numberOfLines={4}
                ellipsizeMode="tail"
            >
                {description}
            </Text>
        </Pressable>
    )
}
