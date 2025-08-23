import { create } from "zustand";
import { User } from "@/types/auth.types";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Props {
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User | null) => void;
}

export const useAuth = create(persist<Props>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: !!user })
}), {
    name : "auth",
    storage : createJSONStorage(() => AsyncStorage)
}))