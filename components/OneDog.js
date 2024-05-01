import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  useGetDogsQuery,
  useAddDogMutation,
  useDeleteDogMutation,
} from '../redux/dogs/dogsReducer';
import { useState, useEffect, useRef } from 'react';

export const OneDog = ({ dog, my }) => {
  const [myDog, setMyDog] = useState(null);
  const [addDog, { isLoading: isAddLoading }] = useAddDogMutation();
  const [deleteDog, { isLoading: isDeleteLoading }] = useDeleteDogMutation();
  console.log();
  const { data: myDogs } = useGetDogsQuery();

  const spinValue = useRef(new Animated.Value(0)).current;
  const spinRotate = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);
      (isDeleteLoading || isAddLoading) && spinRotate();
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  useEffect(() => {
    const addedDog = myDogs?.find((el) => el.name === dog.name);
    setMyDog(addedDog);
  }, [myDogs]);
  return (
    <View style={styles.card}>
      <Image source={{ uri: dog.image }} style={styles.image} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text>Name: {dog.name}</Text>
          <Text>Breed: {dog.breed}</Text>
        </View>
        {my ? (
          <Button
            title={isDeleteLoading ? 'Deleting...' : 'Delete'}
            onPress={() => {
              deleteDog(myDog.id);
            }}
            color={isDeleteLoading?'red':''}
          />
        ) : myDog ? (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <AntDesign
              name="heart"
              size={28}
              color="red"
              onPress={() => {
                deleteDog(myDog.id);
                spinRotate();
              }}
            />
          </Animated.View>
        ) : (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <AntDesign
              name="hearto"
              size={28}
              color="black"
              onPress={() => {
                addDog(dog);
                spinRotate();
              }}
            />
          </Animated.View>
        )}
      </View>
    </View>
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
});
