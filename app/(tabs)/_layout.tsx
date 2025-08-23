
import { Tabs } from 'expo-router';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor : "#0a0a0a",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home',
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: 'Search',
        }}
      />
      <Tabs.Screen 
        name="browse" 
        options={{ 
          title: 'Browse',
        }}
      />
    </Tabs>
  )
}

export default Layout;