import axios from "axios";
import { useEffect } from "react";
import { Alert, Linking, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Button } from "@/components/ui/button";
import AntDesign from '@expo/vector-icons/AntDesign';
import { AUTH_BASE_URL } from "@/constants/api.config";


export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();


const GoogleOauth = () => {

    useWarmUpBrowser();

    /* useEffect(() => {
        console.log('Setting up deep link listener...');
        
        const subscription = Linking.addEventListener('url', (event) => {
            console.log('Deep link event received:', event.url);
            handleDeepLink({ url: event.url });
        });
        
        // Check if app was opened with a URL
        Linking.getInitialURL().then((url) => {
            console.log('Checking initial URL:', url);
            if (url) {
                console.log('Initial URL found:', url);
                handleDeepLink({ url });
            } else {
                console.log('No initial URL');
            }
        }).catch(err => {
            console.error('Error getting initial URL:', err);
        });

        return () => {
            console.log('Removing deep link listener');
            subscription.remove();
        };
    }, []); */

    /* const handleDeepLink = ({ url }: { url: string }) => {
        try {
            console.log('Processing URL:', url);
            
            const urlObj = new URL(url);
            console.log('URL parts:', {
                protocol: urlObj.protocol,
                hostname: urlObj.hostname,
                pathname: urlObj.pathname,
                searchParams: urlObj.search
            });
            
            const token = urlObj.searchParams.get('token');
            const error = urlObj.searchParams.get('message') || urlObj.searchParams.get('error');
            
            console.log('Extracted params:', { 
                hasToken: !!token, 
                tokenLength: token?.length,
                error 
            });
            
            if (token) {
                console.log('Token received, processing authentication...');
                console.log('Authenticated with token:', token);
            } else if (error) {
                console.log('Error in URL:', error);
                Alert.alert('Authentication Error', error);
            } else {
                console.log('No token or error found in URL');
            }
        } catch (error) {
            console.error('Error parsing deep link:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const authUrl = `${AUTH_BASE_URL}/api/auth/google`;
            
            const result = await WebBrowser.openAuthSessionAsync(
                authUrl,
                'safari://auth/success' // Match your backend redirect
            );

            console.log('WebBrowser result:', result);

            // If user cancels, stop loading
            if (result.type === 'cancel' || result.type === 'dismiss') {
                console.log('User cancelled or dismissed');
            }

        } catch (error) {
            console.error("Google Sign-In Error:", error);
            Alert.alert('Error', 'Failed to authenticate with Google');
        }
    } */

    return (
        <Button
            variant="secondary"
            // onPress={handleGoogleSignIn}
        >
            <AntDesign name="google" size={16} color="white" />
            <Text className="text-white font-semibold">Continue with Google</Text>
        </Button>
    )
}

export default GoogleOauth;
