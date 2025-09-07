import { View, Text, TouchableOpacity } from 'react-native';
import { useQueue } from '@/hooks/use-queue';
import { Progress } from '@/components/progress';
import { Image } from 'expo-image';
import { PauseIcon, PlayIcon } from '@/constants/icons';

export const Player = () => {

    const { current } = useQueue();
	const isPlaying = true;

    if (!current) return null;

    return (
        <View
			className='h-16 w-full rounded-xl relative flex flex-col overflow-hidden'
			style={{
				backgroundColor: current.album.color,
			}}
		>
            <Progress
				value={50}
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
									width: 24,
									height: 24,
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