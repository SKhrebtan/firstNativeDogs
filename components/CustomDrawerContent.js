import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
const CustomDrawerContent = (props) => {
    const {user} = useSelector(state=>state.auth)
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        {/* Додайте вашу аватарку тут */}
        {user && <Image source={{uri:user.avatar}} style={styles.avatar} />}
        <View>
        <Text style={styles.username}>{user.email}</Text>
        <Text style={styles.name}>{user.name}</Text>
        </View>
      
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#f4511e',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 6,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e',
    marginTop:10
  },
});

export default CustomDrawerContent;
