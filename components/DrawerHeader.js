import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '../redux/status/statusSlice';
import { View,Text,Button } from 'react-native';
import { logoutUser } from '../redux/auth/authSlice';
import { useNavigation } from '@react-navigation/native';


export default function CustomHeader({title}) {
    const dispatch = useDispatch();
const navigation = useNavigation()
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
         height: '100%',
          width: '100%',
  
        }}
      >
      
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>
          {title}
        </Text>
        <Button
                          onPress={() => {
                            dispatch(logoutUser())
                            navigation.navigate('Login')}}
          title="Logout"
          color="#000"
        />      
       
      </View>
    );
  }