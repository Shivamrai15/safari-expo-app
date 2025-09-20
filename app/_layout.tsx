import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Options } from "@/ui/song/options";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import "./global.css"
import { queryClient } from "@/lib/queryClient";



export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: "#000"} }} />
                    <Options />
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
