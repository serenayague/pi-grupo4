import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Perfil from "../screens/Perfil";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import StackMenu from "./StackMenu";
import CrearPosteo from "../screens/CrearPosteo";

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tab.Screen
                name="stackmenu"
                component={StackMenu}
                options={{
                    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
                }}
            />
            <Tab.Screen
                name="crearPosteo"
                component={CrearPosteo}
                options={{
                    tabBarIcon: () => <Ionicons name="add-circle-outline" size={24} color="black" />
                }}
            />
            <Tab.Screen
                name="perfil"
                component={Perfil}
                options={{
                    tabBarIcon: () => <Feather name="user" size={24} color="black" />
                }}
            />
        </Tab.Navigator>
    )
}

export default HomeMenu