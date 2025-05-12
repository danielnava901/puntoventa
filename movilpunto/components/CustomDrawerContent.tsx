import {View, Text} from "react-native";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {useRouter} from "expo-router";
import useAuthStore from "@/hooks/useAuthStore";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const CustomDrawerContent = (props) => {
    const router = useRouter();
    const { logout } = useAuthStore();
    const {bottom, top} = useSafeAreaInsets();

    return (
        <View style={{flex: 1,
            paddingLeft: 0,
            paddingRight: 0,
            width: "100%",
        }}>
            <DrawerContentScrollView {...props}
                scrollEnabled={false}
                contentContainerStyle={{
                    backgroundColor: "#3b4f6d",
                    paddingTop: top,
                    paddingBottom: 0,
                    paddingHorizontal: 0,
                    width: "100%",
                }}
            >
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3b4f6d",
                    paddingVertical: 20,
                    flex: 1,
                    width: "100%",
                }}>
                    <Text style={{color: "white", fontSize: 22, fontWeight: "bold" }}>Punto
                        <Text style={{color: "#ff6467", fontSize: 22, fontWeight: "bold" }}>Venta</Text></Text>
                </View>

                <View style={{
                    backgroundColor: "#fff",
                    paddingTop: 10,
                }}>
                    <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>


            <View style={{
                borderTopColor: "#dde3fe",
                borderTopWidth: 1,
                padding: 20,
                paddingBottom: 20 + bottom,

            }}>
                <DrawerItem
                    label="Cerrar sesión"
                    onPress={async () => {
                        await logout();
                        router.replace("/(auth)/login");
                    }}
                />
            </View>
        </View>
    )
}

export default CustomDrawerContent;