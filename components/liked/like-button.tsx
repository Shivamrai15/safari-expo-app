import { Image } from 'expo-image';
import { useAuth } from '@/hooks/use-auth';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThumbActiveIcon, ThumbIcon } from '@/constants/icons';
import { useToggleLikedSong } from '@/hooks/use-liked-songs';


interface Props {
    songId : string;
    label : boolean;
}

export const LikeButton = ({ songId, label }: Props) => {

    const { user } = useAuth();

    const  { isLiked, toggleLike, isLoading } = useToggleLikedSong(user?.tokens.accessToken);

    return (
        <TouchableOpacity
            className='h-10 flex flex-row items-center '
            activeOpacity={0.7}
            disabled={!user || isLoading}
            onPress={() => toggleLike(songId)}
        >
            <View className='h-7 aspect-square'>
                <Image
                    source={isLiked(songId) ? ThumbActiveIcon : ThumbIcon}
                    style={{ width: "100%", height: "100%" }}
                    contentFit='contain'
                />
            </View>
            {label && <Text className='text-zinc-100 text-lg'>Add to liked songs</Text>}
        </TouchableOpacity>
    )
}