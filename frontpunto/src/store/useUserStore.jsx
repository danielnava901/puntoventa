import { create } from 'zustand'
import { persist } from 'zustand/middleware';

const useUserStore = create()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            setToken: (token) => set({ token }),
            setUser: (user) => set({ user }),
            setIsAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),
            logout: () => set({ token: null, user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth',
        }
    )
);

export default useUserStore;