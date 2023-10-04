import { StyleSheet, Text, View, Pressable, TextInput, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../login/redux/authSlice';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { DateInput } from '../../components';


import { setName, resetUserInfo, setDob, setAddress, setGender, setPassword, setPhoneNumber, setImageUri } from './redux/userInfoSlice';

const { width, height } = Dimensions.get('window');

const Profile = () => {

  const dispatch = useDispatch();

  const { name, email, password, dob, gender, phone_number, address, imageUri } = useSelector(state => state.userInfo)

  const [isediting, setIsediting] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imageSource, setImageSource] = useState("");

  const handleDobSelect = (date) => {
    dispatch(setDob(`${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`));
  }

  const handleSavePassword = () => {
    dispatch(setPassword(newPassword));
    setChangePassword(false);
    setPrevPassword("");
    setNewPassword("");
    Toast.show({
      type : "success",
      text1 : "Password Changed Successfully"
    })
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch(logout())
    } catch (e) {
      console.error("Error Removing Token From AsyncStorage", e)
    }
    dispatch(resetUserInfo());
  }

  const getImage = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" })
    dispatch(setImageUri(result.assets[0].uri))
    // console.log("url-------------->",result.assets[0].uri)
    setImageSource(result.assets[0].uri)
  }

  const handleEdit = () => {
    setIsediting(true);
  }

  const handleSave = () => {
    setIsediting(false);
    setChangePassword(false)
    setPrevPassword("");
    setNewPassword("");
  }

  // console.log(dob);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20, }}>
        <Pressable onPress={getImage} style={styles.userIcon}>
          {
            imageSource ?
              <Image style={styles.image} source={{ uri: imageUri }} />
              :
              <AntDesign style={styles.icon} name="adduser" size={90} color="#020035" />
          }
        </Pressable>
        <View style={styles.info}>
          {isediting ?
            <Pressable style={styles.actionIcon} onPress={handleSave}>
              <AntDesign name="check" color="green" size={28} />
            </Pressable>
            :
            <Pressable style={styles.actionIcon} onPress={handleEdit}>
              <AntDesign name="edit" color="#020035" size={28} />
            </Pressable>
          }
          <View style={styles.inputBox}>
            <AntDesign name="user" size={22} color="#020035" style={styles.symbol} />
            <TextInput
              style={[styles.input, isediting ? styles.editableInput : styles.disabledInput]}
              placeholder='Name'
              value={name}
              onChangeText={text => dispatch(setName(text))}
              editable={isediting}
            />
          </View>
          <View style={styles.inputBox}>
            <Fontisto name="email" size={22} color="#020035" style={styles.symbol} />
            <TextInput
              style={[styles.input, isediting ? styles.editableInput : styles.disabledInput]}
              placeholder='Email'
              value={email}
              editable={false}
            />
          </View>
          <DateInput mode="date" onSelect={handleDobSelect} disabled={!isediting}>
            <View style={styles.inputBox}>
              <MaterialIcons name="cake" size={22} color="#020035" style={styles.symbol} />
              <Text style={[styles.input, isediting ? styles.editableInput : styles.disabledInput, { paddingVertical: 15, }]}>{dob || "Date of Birth"}</Text>
            </View>
          </DateInput>
          {/* <View style={styles.inputBox}>
            <AntDesign name="smileo" size={22} color="#020035" style={styles.symbol} />
            <TextInput
              style={[styles.input, isediting ? styles.editableInput : styles.disabledInput]}
              placeholder='Gender'
              value={gender}
              editable={isediting}
              onChangeText={text => dispatch(setGender(text))}
            />
          </View> */}
          <View style={styles.inputBox}>
            <Feather name="phone" size={22} color="#020035" style={styles.symbol} />
            <TextInput
              style={[styles.input, isediting ? styles.editableInput : styles.disabledInput]}
              placeholder='Phone Number'
              keyboardType='phone-pad'
              value={phone_number}
              editable={isediting}
              onChangeText={text => dispatch(setPhoneNumber(text))}
            />
          </View>
          {/* <View style={styles.inputBox}>
            <Entypo name="address" size={22} color="#020035" style={styles.symbol} />
            <TextInput
              style={[styles.input, isediting ? styles.editableInput : styles.disabledInput]}
              placeholder='Address'
              value={address}
              editable={isediting}
              onChangeText={text => dispatch(setAddress(text))}
            />
          </View> */}

          <Pressable style={styles.changePassword} disabled={!isediting} onPress={() => setChangePassword(!changePassword)}>
            <Text style={styles.changePasswordText}>Change Password</Text>
          </Pressable>
          {changePassword && isediting &&
            <View style={styles.inputBox}>
              <MaterialCommunityIcons name="onepassword" size={22} color="#020035" style={styles.symbol} />
              <TextInput
                style={[styles.input,{ borderBottomColor: prevPassword === password ? "green" : "red" }]}
                placeholder='Previous Password'
                value={prevPassword}
                editable={isediting}
                secureTextEntry
                onChangeText={text => setPrevPassword(text)}
              />
            </View>
          }
          {
            changePassword && prevPassword === password && isediting &&
            <View style={styles.inputBox}>
              <MaterialIcons name="password" size={22} color="#020035" style={styles.symbol} />
              <TextInput
                style={[styles.input, isediting ? styles.editableInput : styles.disabledInput]}
                placeholder='New Password'
                value={newPassword}
                editable={isediting}
                secureTextEntry
                onChangeText={text => setNewPassword(text)}
              />
              {
                newPassword.length > 5 &&
                <Pressable onPress={handleSavePassword}>
                  <AntDesign name="check" color="green" size={28} />
                </Pressable>
              }
            </View>
          }
        </View>
        <Pressable onPress={handleLogout} style={({ pressed }) => [styles.logout, pressed && { opacity: 0.6 }]}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    height: width * 0.3,
    width: width * 0.3,
    borderRadius: width * 0.15,
    // resizeMode : "contain"
  },
  infoContainer: {
    marginBottom: 20,
  },
  userIcon: {
    paddingTop: 20,
    alignSelf: "center"
  },
  label: {
    fontFamily: "Lato-Bold",
  },
  logout: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: "#020035",
    alignSelf: "center",
    elevation: 4,
    alignItems: "center",
    marginTop: 28,
    width: "90%",
  },
  symbol: {
    marginBottom: 10,
  },
  logoutText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "Lato-Bold",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    margin: 10,
    alignSelf: "center",
  },
  actionIcon: {
    alignSelf: "flex-end",
    paddingRight: 14,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#020035",
    fontFamily: "Lato-Regular",
  },
  editableInput: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    color : "gray"
  },
  disabledInput: {
    color: "#36454F"
  },
  info: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  changePassword: {
    marginBottom: 10,
    paddingLeft: 16,
    paddingVertical: 8,
  },
  changePasswordText: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
  }
})