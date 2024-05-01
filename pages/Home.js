import React, { useState,useEffect,useRef } from "react";
import { View, Text, StyleSheet,FlatList, Image,ActivityIndicator,Animated,TouchableOpacity } from "react-native";
import Reanimated, {LightSpeedInRight, LightSpeedOutRight} from 'react-native-reanimated';
import { useGetAllDogsQuery, useGetDogsQuery } from "../redux/dogs/dogsReducer";
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { useSelector,useDispatch } from "react-redux";
import { setIsModalOpen } from "../redux/status/statusSlice";
import { AntDesign } from '@expo/vector-icons';
import { OneDog } from "../components/OneDog";
const Home = ({navigation}) => {
  const [pages, setPages] = useState(1)
  const dispatch = useDispatch()
  const [narrowData, setNarrowData] = useState([])
  const { isModalOpen } = useSelector((state) => state.status);
  const itemsPerPage = 4
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { data, isLoading, error } = useGetAllDogsQuery({
    pages,
    itemsPerPage,
  });


  useEffect(() => {
    if (!data?.dogs) return;
    setNarrowData((prevData) => [...prevData, ...data.dogs]);
  }, [data]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    isLoading
    ? 
    <View style={styles.container}>
 <ActivityIndicator size="large" color="#00ff00" />
</View>
  :
    <Animated.View style={{
      ...styles.container,
      opacity: fadeAnim, 
    }}>
      <Text>Home Screen</Text>
      <FlatList
      contentContainerStyle={{ gap: 15 }}
        data={narrowData}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('DogDetails',{id:item.id})}>
            <OneDog dog={item} key={item.id}/>       
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        renderScrollComponent={(props) => <InfiniteScrollView {...props} />}
        onEndReached={() => {
          if(data?.totalPages === pages) return;
          setPages(pages + 1);
        }}
        onLoadMoreAsync={()=>console.log('1')}
      />
  </Animated.View>
  );
};

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

export default Home;