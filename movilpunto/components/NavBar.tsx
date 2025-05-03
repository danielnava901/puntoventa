import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {DrawerContentScrollView} from "@react-navigation/drawer";

export const NavBar = (props: any) => {
    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <TouchableOpacity>
                <Text>Venta</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Reportes</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    )
}

export default NavBar;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    item: {
        fontSize: 18,
        paddingVertical: 10,
    },
})