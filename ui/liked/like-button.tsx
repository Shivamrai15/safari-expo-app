import { ThumbActiveIcon, ThumbIcon } from '@/constants/icons';
import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    songId : string;
    label : boolean;
}

export const LikeButton = ({ songId, label }: Props) => {
    return (
        <TouchableOpacity
            className='h-10 flex flex-row items-center '
            activeOpacity={0.7}
        >
            <View className='h-7 aspect-square'>
                <Image
                    source={ThumbIcon}
                    style={{ width: "100%", height: "100%" }}
                    contentFit='contain'
                />
            </View>
            {label && <Text className='text-zinc-100 text-lg'>Add to liked songs</Text>}
        </TouchableOpacity>
    )
}