import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useQueue } from '@/hooks/use-queue';
import { Progress } from '@/components/progress';
import { Image } from 'expo-image';
import { PauseIcon, PlayIcon } from '@/constants/icons';
import { audioPlayer } from '@/services/audio';
import { useEffect, useState } from 'react';
import { AVPlaybackStatus } from 'expo-av';
import { useAuth } from '@/hooks/use-auth';
import { useSettings } from '@/hooks/use-settings';
import { Sheet } from './sheet';


interface Props {
	bottom : number;
}

export const Player = ({ bottom }: Props) => {
	const { user } = useAuth();
    const { settings } = useSettings();
    const { current, deQueue } = useQueue();
	const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
	const [isSheetOpen, setIsSheetOpen] = useState(false);


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
			setDuration(0);
			setPosition(0);
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
			setDuration(0);
			setPosition(0);
            audioPlayer.loadSong(current, user?.token);
        } else {
			const stopAndUnload = async () => {
				await audioPlayer.pause();
				await audioPlayer.unload();
				setIsPlaying(false);
				setPosition(0);
				setDuration(0);
				setProgress(0);
			};
			
			stopAndUnload();
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

	const onSeek = async(value: number) => {
		await audioPlayer.seek(value)
	}

    if (!current) return null;

    return (
		<>
				<View
					style={{
						position: 'absolute',
						bottom: 72 + bottom,
						left: 0,
						right: 0,
						zIndex: 80,
						height: 48,
						padding: 6
					}}
				>
					<Pressable
						className='h-16 w-full rounded-xl relative flex flex-col overflow-hidden'
						style={{
							backgroundColor: current.album.color,
						}}
						onPress={() => setIsSheetOpen(true)}
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
								<Image source={isPlaying ? PauseIcon : PlayIcon} style={{ width: 22, height: 22 }} />
							</TouchableOpacity>
						</View>
					</Pressable>
				</View>
			<Sheet
				isOpen={isSheetOpen}
				onClose={() => setIsSheetOpen(false)}
				data={current}
				duration={duration}
				position={position}
				isPlaying={isPlaying}
				isSubscribed={settings?.subscription.isActive}
				handlePlayPause={handlePlayPause}
				onSeek={onSeek}
				setPosition={setPosition}
			/>
		</>
    )
}