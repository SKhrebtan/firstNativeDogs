import { createStackNavigator } from '@react-navigation/stack';
import { MyDogsPage } from '../pages/MyDogs';
import CustomHeader from '../components/Header'
import MyDogDetails from '../components/MyDogDetails';
const Stack = createStackNavigator();

const MyDogsStack = () => {
  return (
    <Stack.Navigator initialRouteName='AllMyDogs'>
      <Stack.Screen name="AllMyDogs" component={MyDogsPage} options={{
            headerShown: false
          }}/>
      <Stack.Screen name="MyDogDetails" component={MyDogDetails} options={{
            headerShown: false
          }}/>
    </Stack.Navigator>
  );
};

export default MyDogsStack;