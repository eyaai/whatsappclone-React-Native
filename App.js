import Authentication from "./screens/Authentification";
import Acceuil from "./screens/Acceuil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewUser from "./screens/NewUser";
import Chat from "./screens/Chat";
export default function App() {
  const Stack=createNativeStackNavigator();
  return <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="newuser" component={NewUser}/>
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="auth" component={Authentication}/>
      <Stack.Screen name="acc" component={Acceuil} />
    </Stack.Navigator>
  </NavigationContainer>;
  }
