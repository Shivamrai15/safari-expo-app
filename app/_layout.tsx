import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "./global.css"
import { Options } from "@/ui/song/options";


const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: "#000"} }} />
                <Options />
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
