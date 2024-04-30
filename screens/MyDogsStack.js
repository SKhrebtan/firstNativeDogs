import { createStackNavigator } from '@react-navigation/stack';
import DogDetails from '../components/DogDetails'; 
import CustomHeader from '../components/Header'
import { MyDogsPage } from '../pages/MyDogs';
const Stack = createStackNavigator();

const MyDogsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllMyDogs" component={MyDogsPage} options={{
            headerShown: false
          }}/>
      <Stack.Screen name="DogDetails" component={DogDetails} options={{
            headerShown: false
          }}/>
    </Stack.Navigator>
  );
};

export default MyDogsStack;