import {Slot, Redirect} from "expo-router";
import useAuthStore from "@/hooks/useAuthStore";
import {useEffect} from "react";

export default function RootLayout() {
    const { isAuthenticated, loadUser } = useAuthStore();

    useEffect(() => {
        loadUser()
    }, []);

    if(isAuthenticated) {
        console.log("Es aqui donde redirige?");
        return <Redirect href="/(punto)" />;
    }

    return <Slot />;
}
