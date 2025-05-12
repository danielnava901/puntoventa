import {useState} from "react";
import {StyleSheet, TextInput, Button, Text, SafeAreaView, TouchableOpacity} from "react-native";
import useAuthStore from "../../hooks/useAuthStore";
import {router} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";


export default function LoginScreen() {
    const { login } = useAuthStore();
    const [email, setEmail] = useState("daniel@gmail.com");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await login(email);
            router.replace("/(punto)");
        } catch (err: any) {
            setError(err.message);
        }
    };


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}

                />
                <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Entrar!</Text>

                </TouchableOpacity>
                {error && <Text style={{ color: "red" }}>{error}</Text>}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center"
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    buttonContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "#f41a1a",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold"
    },
    error: {
        color: "red",
        marginTop: 10,
    },
})