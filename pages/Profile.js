import { View,Text, Image,StyleSheet,TouchableOpacity,Button,ScrollView } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import CustomCamera from "../components/Camera";
import { updateAvatar } from "../redux/auth/operations";
export const MyProfile = () => {
    const [showEnum, setShowEnum] = useState(false)
    const [showCamera,setShowCamera] = useState(false)
    const dispatch = useDispatch()
const {user} = useSelector(state=>state.auth)

const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        // alert('Дозвольте доступ до медіатеки для вибору зображення');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (!result.cancelled) {
        const formData = new FormData();
        formData.append('file', {
            uri: result.assets[0].uri,
            type: 'image/jpg',
            name: 'photo.jpg',
          });
          dispatch(updateAvatar(formData))
          setShowCamera(false)
          setShowEnum(false)
    }
};
    return(
        <ScrollView>
<View style={styles.container}>
    <Text style={styles.text}>
        {user.email}
    </Text>
    <Text style={styles.text}>
        {user.name}
    </Text>
                {!showEnum && <Image source={{ uri: user.avatar }} style={styles.image} />}
                {showEnum ?<Button title='Cancel' onPress={()=>{setShowEnum(false);setShowCamera(false)}}/>:<Button title='Change Avatar' onPress={()=>setShowEnum(true)}/>}
                {showEnum && <View style={{display:'flex',flexDirection:'row',gap:15}}><Button title='Upload' onPress={selectImage}/><Button title='Camera' onPress={()=>{setShowCamera(!showCamera)}}/></View>}
        {showCamera&&<CustomCamera setShowCamera={setShowCamera} setShowEnum={setShowEnum}/>}
</View></ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding:15,
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        gap:30
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
    },
    text: {
        fontSize:30,
        fontFamily:'Jersey'
    }
  });