import {
    useRef,
    useMemo,
    useEffect
} from 'react';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Album, Song } from '@/types/response.types';
import { LinearGradient } from 'expo-linear-gradient';
import { albumDuration } from '@/lib/utils';
import Slider from "@react-native-community/slider";
import { LikeButton } from '@/ui/liked/like-button';
import {
    AiShuffleActiveIcon,
    AiShuffleIcon,
    BackwardStepIcon,
    ForwardStepIcon,
    PauseCircleIcon,
    PlayCircleIcon,
    RepeatIcon,
    RepeatOneIcon,
    ShuffleIcon
} from '@/constants/icons';
import { useQueue } from '@/hooks/use-queue';
import usePlayerSettings from '@/hooks/use-player-settings';
import { Lyrics } from './lyrics';

interface Props {
    data : Song & { album: Album };
    isOpen: boolean;
    position: number;
    isPlaying: boolean;
    isSubscribed?: boolean;
    onClose: () => void;
    handlePlayPause: () => void;
    onSeek: (value: number) => void;
}

const { height: screenHeight } = Dimensions.get('window');

export const Sheet = ({
    data,
    isOpen,
    position,
    isPlaying,
    isSubscribed,
    onSeek,
    onClose,
    handlePlayPause,
}: Props) => {
    
    const safeAreaHeight = screenHeight;

    const insets = useSafeAreaInsets();
    const { pop, deQueue, shuffle } = useQueue();
    const snapPoints = useMemo(() => ["100%"], []);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const { isLooped, isAiShuffled, setAiShuffled, setLooped } = usePlayerSettings();

    useEffect(() => {
        if (isOpen) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [isOpen]);

    

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onDismiss={onClose}
            backgroundStyle={{
                backgroundColor: '#111111',
            }}
            handleIndicatorStyle={{ display: 'none' }}
            handleComponent={null}
            enableDynamicSizing={false}
            topInset={insets.top}
            bottomInset={insets.bottom}
        >
            <BottomSheetScrollView
                showsVerticalScrollIndicator={true}
                contentInsetAdjustmentBehavior="automatic"
            >
                <View
                    style={{
                        height: safeAreaHeight,
                        width: '100%'
                    }}
                >
                    <ImageBackground
                        source={{
                            uri: data.image
                        }}
                        style={{
                            height: '100%',
                            width: '100%',
                            flex : 1,
                            
                        }}
                    >
                        <LinearGradient
                            colors={['transparent', 'rgba(17,17,17,0.5)','#111111']}
                            locations={[0, 0.6, 0.95]}
                            style={{ 
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <View className='h-full flex justify-end w-full py-4' style={{ backgroundColor: 'rgba(17,17,17,0.3)'}} >
                                <View className='flex flex-col gap-y-4 px-2 py-10'>
                                    <View className='flex flex-row items-center gap-x-4 px-4'>
                                        <Text className='text-white text-2xl font-bold flex-1' numberOfLines={1} ellipsizeMode='tail'>
                                            {data.name}
                                        </Text>
                                        <View className='flex flex-row items-center gap-x-4 justify-center'>
                                            <LikeButton
                                                songId={data.id}
                                                label={false}
                                            />
                                            <TouchableOpacity
                                                className='h-7 aspect-square'
                                                activeOpacity={0.7}
                                                onPress={shuffle}
                                            >
                                                <Image
                                                    source={ShuffleIcon}
                                                    style={{ width: "100%", height: "100%" }}
                                                    contentFit='contain'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View className='flex flex-col gap-y-2'>
                                        <Slider
                                            step={1}
                                            minimumValue={0}
                                            tapToSeek={true}
                                            value={position}
                                            onSlidingComplete={onSeek}
                                            maximumValue={data.duration}
                                            style={{ padding: 0, margin: 0, width: '100%' }}
                                            minimumTrackTintColor="#ef4444"
                                            maximumTrackTintColor="#D3D3D3"
                                            thumbTintColor="transparent"
                                            disabled={!isSubscribed}
                                        />
                                        <View className='flex flex-row items-center justify-between px-4'>
                                            <Text className='text-zinc-300 text-sm'>
                                                {albumDuration(Math.floor(position))}
                                            </Text>
                                            <Text className='text-zinc-300 text-sm'>
                                                {albumDuration(data.duration)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className='flex flex-row items-center w-full px-4'>
                                        <View className='w-1/5 h-16 flex items-start justify-center'>
                                            <TouchableOpacity
                                                className='h-7 aspect-square'
                                                activeOpacity={0.7}
                                                disabled={!isSubscribed}
                                                onPress={() => setAiShuffled(!isAiShuffled)}
                                            >
                                                <Image
                                                    source={isAiShuffled ? AiShuffleActiveIcon : AiShuffleIcon}
                                                    style={{ width: "100%", height: "100%" }}
                                                    contentFit='contain'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View className='w-1/5 h-16 flex items-start justify-center'>
                                            <TouchableOpacity
                                                className='h-10 aspect-square'
                                                onPress={pop}
                                                activeOpacity={0.7}
                                                disabled={!isSubscribed}
                                            >
                                                <Image
                                                    source={BackwardStepIcon}
                                                    style={{ width: "100%", height: "100%" }}
                                                    contentFit='contain'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View className='w-1/5 h-16 flex items-center justify-center'>
                                            <TouchableOpacity
                                                className='h-full aspect-square'
                                                activeOpacity={0.7}
                                                onPress={handlePlayPause}
                                            >
                                                <Image
                                                    source={isPlaying ? PauseCircleIcon : PlayCircleIcon}
                                                    style={{ width: "100%", height: "100%" }}
                                                    contentFit='contain'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View className='w-1/5 h-16 flex items-end justify-center'>
                                            <TouchableOpacity
                                                className='h-10 aspect-square'
                                                activeOpacity={0.7}
                                                onPress={deQueue}
                                            >
                                                <Image
                                                    source={ForwardStepIcon}
                                                    style={{ width: "100%", height: "100%" }}
                                                    contentFit='contain'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View className='w-1/5 h-16 flex items-end justify-center'>
                                            <TouchableOpacity
                                                className='h-7 aspect-square'
                                                activeOpacity={0.7}
                                                onPress={() => setLooped(!isLooped)}
                                            >
                                                <Image
                                                    source={isLooped ? RepeatOneIcon : RepeatIcon}
                                                    style={{ width: "100%", height: "100%" }}
                                                    contentFit='contain'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>
                <View
                    style={{
                        minHeight: safeAreaHeight,
                        width: '100%',
                        backgroundColor: '#111111',
                        padding: 24
                    }}

                >
                    <View 
                        className='rounded-3xl bg-neutral-800 relative overflow-hidden'
                        style={{
                            height : 600
                        }}
                    >
                        <Lyrics
                            songId={data.id}
                            position={position}
                            onSeek={onSeek}
                        />
                    </View>
                </View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
}