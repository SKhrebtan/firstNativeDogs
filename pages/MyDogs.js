import { View,Text,FlatList,TouchableOpacity,Image,StyleSheet,ActivityIndicator } from "react-native"
import { useGetDogsQuery, } from "../redux/dogs/dogsReducer"
import { useNavigation } from '@react-navigation/native';
import { OneDog } from "../components/OneDog";
export const MyDogsPage = ( ) => {
const navigation = useNavigation()
    const {data, isLoading,error} = useGetDogsQuery()
    return   isLoading
    ? 
    <View style={styles.container}>
 <ActivityIndicator size="large" color="#00ff00" />
</View>
  :(
<View style={styles.container}>
    <Text>My dogs page</Text>
    {data && <FlatList
      contentContainerStyle={{ gap: 15 }}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('MyDogDetails',{id:item.id})}>
          <OneDog dog={item} key={item.id} my={true}/>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        // renderScrollComponent={(props) => <InfiniteScrollView {...props} />}
        // onEndReached={() => {
        //   if(data?.totalPages === pages) return;
        //   setPages(pages + 1);
        // }}
        onLoadMoreAsync={()=>console.log('1')}
      />}
</View>
    )
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 240,
      borderRadius: 10,
      marginBottom: 10,
    },
    card: {
      width: 320,
      borderRadius: 10,
      backgroundColor: '#fff',
      padding: 10,
      // marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      position: 'absolute',
      right: 20,
      top: 20,
      width: 30,
      height: 30,
      backgroundColor: '#fff',
      borderRadius: 15, // половина висоти або ширини
      borderWidth: 1,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mobileContainer: {
      width: '100%',
   height: '100%',
   backgroundColor: 'red',
   transition: '1000 linear',
  },
    container: {
      width:'100%',
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
       
  });