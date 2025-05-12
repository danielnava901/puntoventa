import 'react-native-gesture-handler'
import useAuthStore from "@/hooks/useAuthStore";
import {Redirect} from "expo-router";
import { Drawer } from "expo-router/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import CustomDrawerContent from "@/components/CustomDrawerContent";


export default function PuntoLayout() {
    const { isAuthenticated } = useAuthStore();

    if(!isAuthenticated) {
        return <Redirect href="/(auth)/login"/>
    }

    return (
        <GestureHandlerRootView >
            <Drawer
                drawerContent={CustomDrawerContent}

            >
                <Drawer.Screen name="index" options={{
                    drawerLabel: "Ventas",
                    headerTitle: "Ventas",
                }}></Drawer.Screen>
                <Drawer.Screen name="reportes" options={{
                    drawerLabel: "Reportes"
                }}></Drawer.Screen>

            </Drawer>
        </GestureHandlerRootView>
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



