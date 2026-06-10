import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ComentarPost from "../screens/ComentarPost";

const Stack = createNativeStackNavigator();

function StackMenu() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="comentarPost" component={ComentarPost} />
        </Stack.Navigator>
    )
}

export default StackMenu