import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import DogDetails from '../components/DogDetails';
import CustomHeader from '../components/Header';
import Login from '../pages/Login';
import Register from '../pages/Registration';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Registration"
        component={Register}
        options={{
          headerShown: false,
        }}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
