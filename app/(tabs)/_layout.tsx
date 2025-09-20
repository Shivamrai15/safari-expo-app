import { Tabs, usePathname } from 'expo-router';
import { Image } from 'expo-image';
import { HomeIcon,
	HomeOutlineIcon,
	BrowseIcon,
	BrowseOutlineIcon,
	PlaylistIcon,
	PlaylistOutlineIcon,
	SearchIcon,
	SearchOutlineIcon
} from "@/constants/icons";
import { useAuth } from '@/hooks/use-auth';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQueue } from '@/hooks/use-queue';
import { Player } from '@/ui/song/player';


const Layout = () => {

	const pathname = usePathname();
	const insets = useSafeAreaInsets();

	const { current } = useQueue();
	const { isLoggedIn, user } = useAuth();


	return (
		<>
			{
				current && (
					<Player
						bottom={insets.bottom}
						isOffline={pathname === "/downloads"}
					/>
				)
			}
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						backgroundColor: "#111111",
						borderTopWidth: 0,
						height: 60 + insets.bottom,
						paddingBottom: insets.bottom,
						paddingTop: 8,
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
					},
				}}
			>
				<Tabs.Screen 
					name="home" 
					options={{ 
						tabBarIcon: ({ focused }) => {
							return focused ? (
								<Image
									source={HomeIcon}
									style={{ width: 24, height: 24 }}
								/>
							) : (
								<Image
									source={HomeOutlineIcon}
									style={{ width: 24, height: 24 }}
								/>
							)
						}
					}} 
				/>
				<Tabs.Screen 
					name="search" 
					options={{ 
						tabBarIcon: ({ focused }) => {
							return focused ? (
								<Image
									source={SearchIcon}
									style={{ width: 26, height: 26 }}
								/>
							) : (
								<Image
									source={SearchOutlineIcon}
									style={{ width: 26, height: 26 }}
								/>
							)
						}
					}}
				/>
				<Tabs.Screen 
					name="browse" 
					options={{ 
						tabBarIcon: ({ focused }) => {
							return focused ? (
								<Image
									source={BrowseIcon}
									style={{ width: 24, height: 24 }}
								/>
							) : (
								<Image
									source={BrowseOutlineIcon}
									style={{ width: 24, height: 24 }}
								/>
							)
						}
					}}
				/>
				<Tabs.Screen 
					name="playlist" 
					options={{ 
						tabBarIcon: ({ focused }) => {
							return focused ? (
								<Image
									source={PlaylistIcon}
									style={{ width: 24, height: 24 }}
								/>
							) : (
								<Image
									source={PlaylistOutlineIcon}
									style={{ width: 24, height: 24 }}
								/>
							)
						}
					}}
				/>
				<Tabs.Screen 
					name="account" 
					options={{ 
						tabBarIcon: () => {
							return (isLoggedIn && user && user.user?.image !==undefined) ? (
								<Image
									source={{
										uri: user.user?.image as string
									}}
									style={{ width: 24, height: 24 }}
								/>
							) : (
								<View
									className='size-8 flex items-center justify-center rounded-full bg-red-900'
								>
									<Text className='text-white font-semibold'>
										S
									</Text>
								</View>
							)
						}
					}}
				/>
				<Tabs.Screen 
					name="album/[albumId]" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}} 
				/>
				<Tabs.Screen 
					name="artist/[artistId]" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}}
				/>
				<Tabs.Screen 
					name="artist-songs/[artistId]" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}}
				/>
				<Tabs.Screen 
					name="mood-songs/[moodId]" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}}
				/>
				<Tabs.Screen 
					name="genre-songs/[genreId]" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}}
				/>
				<Tabs.Screen 
					name="playlist-songs/[playlistId]" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}}
				/>
				<Tabs.Screen 
					name="account/profile" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}}
				/>
				<Tabs.Screen 
					name="liked-songs" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}}
				/>
				<Tabs.Screen 
					name="history" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}}
				/>
				<Tabs.Screen 
					name="downloads" 
					options={{
						tabBarIcon : ()=>null,
						href : null
					}}
				/>
			</Tabs>
		</>
	)
}

export default Layout;