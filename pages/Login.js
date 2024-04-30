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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from 'react';
import { loginUser } from '../redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch()
  const {token} = useSelector(state=>state.auth)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const onLogin = () => {
    const newUser = {
      email,
      password
    };
    dispatch(loginUser(newUser));
  };
 useEffect(()=>{
  if(!token) return;
  navigation.navigate('Home')
 },[token])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <View>
        
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
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
              <Button
                title="Login"
                style={styles.input}
                onPress={onLogin}
              />
            </KeyboardAvoidingView>
          </View>
      </View>
      <Button
        title="Go to Registration"
        onPress={() =>
          navigation.navigate('Registration', { sessionId: 45, userId: '22e24' })
        }
      />
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 50,
    marginTop: 30,
    // justifyContent: "center",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default Login;
