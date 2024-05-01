import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import MyDogsStack from './MyDogsStack';
import DrawerHeader from '../components/DrawerHeader';
import { MyProfile } from '../pages/Profile';
import { useSelector,useDispatch } from 'react-redux';
import {MaterialIcons,FontAwesome,FontAwesome6} from '@expo/vector-icons'
import {View} from 'react-native'
import CustomDrawerContent from '../components/CustomDrawerContent';
const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
    const {token} = useSelector(state=>state.auth)
  return (
    <Drawer.Navigator initialRouteName="Main" screenOptions={{
      drawerStyle: {
        backgroundColor: '#c6cbef',
        width: 240,
        paddingTop:30,
      },
    }}
    drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={HomeStack}
        options={{       
          drawerLabel: 'Home', 
                headerTitle: (props) => <DrawerHeader {...props}  title="Home"><MaterialIcons name='menu' size={28}/></DrawerHeader>,
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                drawerIcon: () => (
                  <View View style={{width:30,marginRight:4}}>
                    <FontAwesome name='home' size={28} tint={'#9E9E9E'} />
                  </View>              
                ),
                drawerActiveTintColor:'#f4511e',
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                },   
                drawerItemStyle:{
                  marginBottom:10,
                  marginTop:20
                }           
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
                drawerIcon: () => (
                  <View View style={{width:30,marginRight:4}}>
                    <FontAwesome6 name='dog' size={28} tint={'#9E9E9E'} />
                  </View>
                  
            
              ),
              drawerActiveTintColor:'#f4511e',
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                },  
                drawerItemStyle:{
                  marginBottom:10
                }  
                }}
      />
        <Drawer.Screen
        name="Profile"
        component={MyProfile}
        options={{      
                headerTitle: (props) => <DrawerHeader {...props} title="Profile" />,
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                drawerActiveTintColor:'#f4511e',
                drawerIcon: () => (
                  <View style={{width:30,marginRight:4}}>
                    <FontAwesome name='user' size={28} tint={'#9E9E9E'} />
                  </View>
                  
            
              ),
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
