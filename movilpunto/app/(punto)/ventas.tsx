import {View, Text, TouchableOpacity} from "react-native";
import useAuthStore from "@/hooks/useAuthStore";

export default function VentasScreen() {
    const { logout } = useAuthStore();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Pantalla de Ventas</Text>
            <TouchableOpacity
                onPress={async () => {
                    await logout()
                }}>
                <Text >salir</Text>
            </TouchableOpacity>
        </View>
    );
}
