import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer?.()}>
                <Ionicons name="menu" size={28} color="#333" />
            </TouchableOpacity>

            <Image
                source={require("@/assets/images/icon.png")} // asegúrate de tener tu logo en assets
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: "100%",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f2f2f2",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    logo: {
        height: 40,
        width: 100,
    },
});

export default Header