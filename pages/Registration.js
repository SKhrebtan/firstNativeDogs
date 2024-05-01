import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from 'react';
import { registerUser } from '../redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onRegister = () => {
    const newUser = {
      name,
      email,
      password,
    };
    dispatch(registerUser(newUser));
  };

  useEffect(()=>{
    if(!token) return;
    navigation.navigate('Home')
   },[token])

  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>Register Screen</Text>
        <View >
          <View style={styles.form}>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Username"
                style={styles.input}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.input}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={styles.input}
              />
              {error && <Text style={styles.errorText}>Invalid data or user already exists</Text>}
              <Button
                title="Register"
                style={styles.input}
                onPress={onRegister}
              />
            </KeyboardAvoidingView>
          </View>
        </View>
        <Button
          title="Go to Login"
          onPress={() =>
            navigation.navigate('Login', { sessionId: 45, userId: '22e24' })
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form:{
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: "center",
    width: '100%',

  },
  container: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    gap: 50,
    marginTop: 30,
    justifyContent: "center",
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  errorText:{
    color: 'red',
    fontSize: 20,
    marginBottom: 10
      }
});

export default Register;
