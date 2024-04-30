import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import MyDogsStack from './MyDogsStack';
import DrawerHeader from '../components/DrawerHeader';
import { useSelector,useDispatch } from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons'
const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
    const {token} = useSelector(state=>state.auth)
    console.log(token)
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Main"
        component={HomeStack}
        options={{        
                headerTitle: (props) => <DrawerHeader {...props}  title="Main"><MaterialIcons name='menu' size={28}/></DrawerHeader>,
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                },              
              }}
      />
      <Drawer.Screen
        name="MyDogs"
        component={MyDogsStack}
        options={{      
                headerTitle: (props) => <DrawerHeader {...props} title="My dogs" />,
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                },  
                }}
      />
    </Drawer.Navigator>
  );
};
