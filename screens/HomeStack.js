import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import DogDetails from '../components/DogDetails';
import CustomHeader from '../components/Header';
import DrawerHeader from '../components/DrawerHeader';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
               }}
      />
      <Stack.Screen
        name="DogDetails"
        component={DogDetails}
        options={{
          headerShown: false,
        }}

      
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
