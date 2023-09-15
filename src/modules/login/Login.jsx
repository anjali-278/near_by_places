import { StyleSheet, Text, View, TextInput, Pressable, ImageBackground, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import { BackgroundVideo } from '../../components';

import { setEmail, setPassword} from '../profile/redux/userInfoSlice';

import { login } from './redux/authSlice';


const Login = () => {

  const dispatch = useDispatch();

  const { email, password } = useSelector(state => state.userInfo)


  const [enable, setEnable] = useState(false)

  const verify = () => {
    if (email && email.includes("@")
      && password && password.length > 5) {
      setEnable(true);
    }
    else {
      setEnable(false);
    }
  }


  const token = "dhfsjt8776trfdvcbncvhfherquey";

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('token', token);
      dispatch(login(token))
    } catch (e) {
      Alert("Failed to Login", e)
    }
  }

  useEffect(() => {
    verify()
  }, [email, password])



  return (
    <>
      <StatusBar translucent backgroundColor='transparent' />
      <View style={styles.container}>
        <BackgroundVideo/>
        {/* <ImageBackground source={{ uri: "https://media.istockphoto.com/id/1202864734/photo/location-pin-nevigation-icons-on-world-map-polygon-graphic-background-with-connected-lines.jpg?s=612x612&w=0&k=20&c=PTFNNpmgbkWr_-QLIwCW2p9sZW8ESHFOjvnjX856U64=" }} resizeMode="cover" style={styles.image}> */}
          <View style={styles.form}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
              {/* <TextInput
          placeholder='Name'
          style={styles.input}
          onChangeText={(text) => dispatch(setName(text))}
          value={name}
        /> */}
              <TextInput
                placeholder='Email'
                style={styles.input}
                onChangeText={(text) => dispatch(setEmail(text))}
                value={email}
                placeholderTextColor={"#FFFFFF"}
              />
              <TextInput
                placeholder='Password'
                secureTextEntry
                style={styles.input}
                onChangeText={(text) => dispatch(setPassword(String(text)))}
                value={password}
                placeholderTextColor={"#FFFFFF"}
              />
            </View>
            <Pressable disabled={!enable} style={({ pressed }) => [styles.loginButton, enable ? styles.activeButton : styles.disactiveButton, pressed && { opacity: 0.6 }]} onPress={enable ? handleLogin : undefined}>
              <Text style={[styles.loginButtonText, enable ? styles.activeText : styles.disactiveText]}>Login</Text>
            </Pressable>
          </View>
        {/* </ImageBackground> */}
      </View>
    </>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth : 2,
    justifyContent : "flex-end",
    alignItems : "center"
  },
  form: {
    width: "100%",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom : 50,
    borderColor : "black"
  },
  // image: {
  //   flex: 1,
  //   justifyContent: "flex-end",
  // },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
    fontFamily : "Lato-Black"
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderRadius: 14,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    fontFamily : "Lato-Regular"
  },
  loginButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  disactiveButton: {
    borderColor: "#FFFFFF",
    borderWidth: 1,
    color : "black"
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily : "Lato-Bold"
  }, 
  disactiveText :{
    color: "#FFFFFF",
  },
  activeText :{
    color : "#000000",
  },
})