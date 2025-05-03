import { useEffect } from "react";
import { Redirect } from "expo-router";
import useAuthStore from "@/hooks/useAuthStore";

export default function Logout() {
    const { logout } = useAuthStore();

    useEffect(() => {
        logout(); // Tu función que borra el token y setea isAuthenticated: false
    }, []);

    return <Redirect href="/(auth)/login" />;
}
