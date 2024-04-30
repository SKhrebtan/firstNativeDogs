import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from '../components/Header';
import Login from '../pages/Login';
import Register from '../pages/Registration';
import { MyDrawer } from './MyDrawer';
const MainStack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
      
        <MainStack.Screen
          name="Registration"
          options={{
            headerTitle: (props) => (
              <CustomHeader {...props} title="Register" />
            ),
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            stackAnimation: 'none'
          }}
          component={Register}
        />
        <MainStack.Screen
          name="Login"
          options={{
            headerTitle: () => <CustomHeader title="Login" />,
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            stackAnimation: 'none',
                      }}
          component={Login}
        />
        <MainStack.Screen
          name="Home"
          component={MyDrawer}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
