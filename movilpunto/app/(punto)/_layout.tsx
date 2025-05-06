import useAuthStore from "@/hooks/useAuthStore";
import {Redirect} from "expo-router";
import { Drawer } from "expo-router/drawer";



export const unstable_settings = {
    initialRouteName: '(punto)/ventas',
};



export default function PuntoLayout() {
    const { isAuthenticated } = useAuthStore();

    console.log("PUNTO LAYOUT.....")
    if(!isAuthenticated) {
        return <Redirect href="/login"/>
    }

    console.log("PUNTO LAYOUT.....", unstable_settings)
    return (
        <Drawer screenOptions={{ headerShown: false }} initialRouteName="ventas">
            <Drawer.Screen
                name="ventas"
                options={{ drawerLabel: "Ventas", title: "Ventas" }}
            />
            <Drawer.Screen
                name="reportes"
                options={{ drawerLabel: "Reportes", title: "Reportes" }}
            />
        </Drawer>
    );
}


/*
Tengo esta estructura en mi proyecto de react native con expo router

/app
|__/(auth)
|   |____layout.tsx
|   |___login.tsx
|__/(punto)
    |____layout.tsx
    |___ventas.tsx
    |___reportes.tsx

este es el archivo /app/(punto)/_layout.tsx
y este es el archivo /app/(punto)/ventas.tsx

quiero que en mi drawer esten las opciones "ventas" y "reportes"
y que ventas sea la pantalla inicial
*/



