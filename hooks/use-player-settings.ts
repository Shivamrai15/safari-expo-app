import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";


interface Props {
    isLooped : boolean;
    isAiShuffled : boolean;
    setLooped : (value: boolean) => void;
    setAiShuffled : (value: boolean) => void;
}

const usePlayerSettings = create(persist<Props>((set) => ({
    isLooped : false,
    isAiShuffled : false,
    setLooped : (value) => set({ isLooped: value }),
    setAiShuffled : (value) => set({ isAiShuffled: value }),
}), {
    name: "player-settings",
    storage: createJSONStorage(() => AsyncStorage),
}));

export default usePlayerSettings;
