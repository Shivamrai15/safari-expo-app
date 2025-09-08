import { Audio as ExpoAudio, AVPlaybackSource, AVPlaybackStatus, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { Album, Song } from '@/types/response.types';

export class Audio {
    private sound: ExpoAudio.Sound | null = null;
    private currentSong: Song & { album: Album } | null = null;
    private isLoaded = false;
    private isPlaying = false;
    private onLoadCallback?: () => void;
    private onEndCallback?: () => void;
    private onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;

    constructor() {
        this.setupAudio();
    }

    // Setup audio mode for background playback
    private async setupAudio() {
        try {
        await ExpoAudio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            playThroughEarpieceAndroid: false,
        });
        } catch (error) {
            console.error('Error setting up audio:', error);
        }
    }

    // Load a song
    async loadSong(song: Song & { album: Album }): Promise<boolean> {
        try {
        // Unload previous sound
        if (this.sound) {
            await this.unload();
        }

        this.currentSong = song;

        const { sound } = await ExpoAudio.Sound.createAsync(
            { uri: song.url } as AVPlaybackSource,
            {
                shouldPlay: false,
                isLooping: false,
                volume: 1.0,
            },
            this.handlePlaybackStatusUpdate.bind(this)
        );

        this.sound = sound;
        this.isLoaded = true;

        // Call onLoad callback
        if (this.onLoadCallback) {
            this.onLoadCallback();
        }

        this.play();

        return true;
        } catch (error) {
            console.error('Error loading song:', error);
            this.currentSong = null;
            this.isLoaded = false;
            return false;
        }
    }

    // Handle playback status updates
    private handlePlaybackStatusUpdate(status: AVPlaybackStatus) {
        if (status.isLoaded) {
        this.isPlaying = status.isPlaying;
        
        // Call custom status update callback
        if (this.onPlaybackStatusUpdate) {
            this.onPlaybackStatusUpdate(status);
        }

        // Handle song end
        if (status.didJustFinish && this.onEndCallback) {
            this.onEndCallback();
        }
        } else if (status.error) {
            console.error('Audio playback error:', status.error);
        }
    }

    // Play the loaded song
    async play(): Promise<boolean> {
        if (!this.sound || !this.isLoaded) {
            return false;
        }

        try {
            await this.sound.playAsync();
            this.isPlaying = true;
            return true;
        } catch (error) {
            console.error('Error playing sound:', error);
            return false;
        }
    }

    // Pause the current song
    async pause(): Promise<boolean> {
        if (!this.sound || !this.isLoaded) {
            return false;
        }

        try {
            await this.sound.pauseAsync();
            this.isPlaying = false;
            return true;
        } catch (error) {
            console.error('Error pausing sound:', error);
            return false;
        }
    }

    // Stop the current song
    async stop(): Promise<boolean> {
        if (!this.sound || !this.isLoaded) {
            return false;
        }

        try {
            await this.sound.stopAsync();
            this.isPlaying = false;
            return true;
        } catch (error) {
            console.error('Error stopping sound:', error);
            return false;
        }
    }

    // Seek to a specific position (in seconds)
    async seek(seconds: number): Promise<boolean> {
        if (!this.sound || !this.isLoaded) {
            return false;
        }

        try {
            const positionMillis = seconds * 1000;
            await this.sound.setPositionAsync(positionMillis);
            return true;
        } catch (error) {
            console.error('Error seeking:', error);
            return false;
        }
    }

    // Set volume (0.0 to 1.0)
    async setVolume(volume: number): Promise<boolean> {
        if (!this.sound || !this.isLoaded) {
            return false;
        }

        try {
            const clampedVolume = Math.max(0, Math.min(1, volume));
            await this.sound.setVolumeAsync(clampedVolume);
            return true;
        } catch (error) {
            console.error('Error setting volume:', error);
            return false;
        }
    }

    // Set looping
    async setLooping(isLooping: boolean): Promise<boolean> {
        if (!this.sound || !this.isLoaded) {
            return false;
        }

        try {
            await this.sound.setIsLoopingAsync(isLooping);
            return true;
        } catch (error) {
            console.error('Error setting looping:', error);
            return false;
        }
    }

    // Get current playback status
    async getStatus(): Promise<AVPlaybackStatus | null> {
        if (!this.sound) {
            return null;
        }

        try {
            return await this.sound.getStatusAsync();
        } catch (error) {
            console.error('Error getting status:', error);
            return null;
        }
    }

    // Unload current sound
    async unload(): Promise<boolean> {
        if (this.sound) {
        try {
            await this.sound.unloadAsync();
            this.sound = null;
            this.isLoaded = false;
            this.isPlaying = false;
            this.currentSong = null;
            return true;
        } catch (error) {
            console.error('Error unloading sound:', error);
            return false;
        }
        }
        return true;
    }

    // Event handlers
    onLoad(callback: () => void) {
        this.onLoadCallback = callback;
    }

    onEnd(callback: () => void) {
        this.onEndCallback = callback;
    }

    onStatusUpdate(callback: (status: AVPlaybackStatus) => void) {
        this.onPlaybackStatusUpdate = callback;
    }

    // Getters
    getCurrentSong() {
        return this.currentSong;
    }

    getIsLoaded() {
        return this.isLoaded;
    }

    getIsPlaying() {
        return this.isPlaying;
    }

    // Cleanup
    async dispose() {
        await this.unload();
    }
}

// Export singleton instance
export const audioPlayer = new Audio();
