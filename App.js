import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Perfil from './src/screens/Perfil';

import Login from './src/screens/Login';
import Registro from './src/screens/Registro';
import HomeMenu from './src/components/HomeMenu';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="registro" component={Registro} />
        <Stack.Screen name="homeMenu" component={HomeMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}