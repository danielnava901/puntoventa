import { Redirect } from "expo-router";

export default function PuntoIndex() {
    console.log("index punto_______");
    return <Redirect href="/(punto)/ventas" />;
}