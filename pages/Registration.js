import React from "react";
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, TouchableWithoutFeedback,TextInput,Keyboard,Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { registerUser } from "../redux/auth/operations";
import { useDispatch,useSelector } from "react-redux";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {token} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
	const navigation = useNavigation();
  const onRegister = () => {
    const newUser = {
      name,
      email,
      password
    }
    dispatch(registerUser(newUser))
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text>Register Screen</Text>
      <View>
     
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
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
          <Button title="Register" style={styles.input} onPress={onRegister} />
        </KeyboardAvoidingView>
      </View>
  
      </View>
      <Button
        title="Go to Login"
        onPress={() =>
          navigation.navigate("Login", { sessionId: 45, userId: "22e24" })
        }
      />
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: "center",
    gap: 50,
    marginTop:30
    // justifyContent: "center",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});

export default Register;
