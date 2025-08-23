import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./global.css"


const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: "#000"} }} />
        </QueryClientProvider>
    );
}
