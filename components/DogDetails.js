import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  useGetOneDogFromAllQuery,
  useGetOneDogQuery,
} from '../redux/dogs/dogsReducer';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
export default function DogDetails() {
  const [dog, setDog] = useState(null);
  const {
    params: { id, my },
  } = useRoute();
  const { data, isLoading } = useGetOneDogFromAllQuery(id);

  const navigation = useNavigation();
  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    data && (
      <View style={styles.container}>
        <Button
          title="Back to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <View style={styles.card}>
          <Image source={{ uri: data.image }} style={styles.image} />
          <Text>Name: {data.name}</Text>
          <Text>Breed: {data.breed}</Text>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    // justifyContent: "center",
    marginTop: 40,
    gap: 20,
  },
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
