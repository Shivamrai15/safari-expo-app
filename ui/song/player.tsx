import { View, Text, TouchableOpacity } from 'react-native';
import { useQueue } from '@/hooks/use-queue';
import { Progress } from '@/components/progress';
import { Image } from 'expo-image';
import { PauseIcon, PlayIcon } from '@/constants/icons';
import { audioPlayer } from '@/services/audio';
import { useEffect, useState } from 'react';
import { AVPlaybackStatus } from 'expo-av';

export const Player = () => {
    const { current, deQueue } = useQueue();
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);

    // Handle playback status updates
    useEffect(() => {
        audioPlayer.onStatusUpdate((status: AVPlaybackStatus) => {
            if (status.isLoaded) {
                setIsPlaying(status.isPlaying);
                setPosition(status.positionMillis || 0);
                setDuration(status.durationMillis || 0);
                
                // Calculate progress percentage
                if (status.durationMillis && status.positionMillis) {
                    const progressPercent = (status.positionMillis / status.durationMillis) * 100;
                    setProgress(progressPercent);
                }
            }
        });

        audioPlayer.onLoad(() => {
			// TODO View and History POST API CALL
        });

        audioPlayer.onEnd(() => {
            setIsPlaying(false);
            setProgress(0);
			deQueue();
        });
    }, []);

    // Load song when current changes
    useEffect(() => {
        if (current && current !== audioPlayer.getCurrentSong()) {
            audioPlayer.loadSong(current);
        }
    }, [current]);

    const handlePlayPause = async () => {
        if (!current) return;

        if (isPlaying) {
            await audioPlayer.pause();
        } else {
            await audioPlayer.play();
        }
    };

    if (!current) return null;

    return (
        <View
			className='h-16 w-full rounded-xl relative flex flex-col overflow-hidden'
			style={{
				backgroundColor: current.album.color,
			}}
		>
            <Progress
				value={progress}
				variant='danger'
				size='sm'
			/>
			<View className='flex-1 flex-row justify-between items-center p-2 px-3'>
				<View className='flex-1 flex flex-row items-center gap-x-4'>
					<View className='h-full aspect-square my-2 rounded-lg overflow-hidden'>
						<Image
							source={{ uri: current.album.image }}
							style={{
								height : "100%",
								width : "100%",
							}}
							contentFit='contain'
						/>
					</View>
					<View className='flex-1 flex flex-col'>
						<Text className='text-white font-semibold' numberOfLines={1} ellipsizeMode='tail'>
							{current.name}
						</Text>
						<Text className='text-neutral-300 text-sm' numberOfLines={1} ellipsizeMode='tail'>
							{current.album.name}
						</Text>
					</View>
				</View>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={handlePlayPause}
				>
					{
						isPlaying ? (
							<Image
								source={PauseIcon}
								style={{
									width: 24,
									height: 24,
								}}
								contentFit='contain'
							/>
						) : (
							<Image
								source={PlayIcon}
								style={{
									width: 20,
									height: 20,
								}}
								contentFit='contain'
							/>
						)
					}
				</TouchableOpacity>
			</View>
		</View>
    )
}