import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "@/constants/ApiConstants";
import {sender} from "@/utils/sender";

type User = {
    email: string;
    token: string;
};

type AuthState = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    loadUser: async () => {
        const stored = await AsyncStorage.getItem("user");
        console.log({stored: !!stored});
        if (stored) {
            set({ user: JSON.parse(stored), isLoading: false, isAuthenticated: true });
        } else {
            set({ isLoading: false, isAuthenticated: false });
        }
    },

    login: async (email: string) => {
        const data = await sender({
            url: "/login",
            method: "POST",
            data: {email}
        } )
        const user = { user: data.user, token: data.token };
        await AsyncStorage.setItem("user", JSON.stringify(user));
        set({ user, isAuthenticated: true });
    },

    logout: async () => {
        await AsyncStorage.removeItem("user");
        set({ user: null, isAuthenticated: false });
    },
}));

export default useAuthStore;