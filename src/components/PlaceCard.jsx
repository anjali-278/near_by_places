import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import GetStars from './GetStars';
import placeColors from '../constants/placeColor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

import ModalComponent from './ModalComponent';

const PlaceCard = ({ place }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleUserPressed = (name) => {
    setModalVisible(true);
    setUsername(name);
  }

  const handleMessageCancel = () => {
    setModalVisible(false);
    setUsername("");
    setMessage("")
  }

  const handleMessageSend = () => {
    if (message) {
      setModalVisible(false)
      setUsername("");
      Toast.show({
        type: "success",
        text1: "Sent",
        text2: `Message sent to ${username} successfully`
      })
      setMessage("");
    }
    else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please type a Message"
      })
    }
  }


  return (
    <Pressable onPress={() => place?.types.includes("user") && handleUserPressed(place?.name)}>
      <View style={[styles.container,
      {
        borderLeftColor: place?.types.includes("hospital") ?
          placeColors.hospital : place?.types.includes("police") ?
            placeColors.police : placeColors.users
      }]}>
        <View style={styles.placeName}>
          {place?.icon ?
            <Image style={styles.icon} source={{ uri: place?.icon }} /> :
            <AntDesign name="user" size={22} />
          }
          <Text style={styles.name}>{place?.name}</Text>
        </View>
        <View style={styles.rating}>
          {
            place?.rating ?
              <>
                <Text style={styles.rating}>{place?.rating?.toFixed(1)}</Text>
                <GetStars rating={place?.rating} />
                <Text style={styles.voter}>({place?.user_ratings_total} ratings)</Text>
              </>
              :
              <Text>No Ratings</Text>
          }
        </View>
        <Text style={styles.type}>{place?.types[0]}</Text>
        <Text style={styles.vicinity}>{place?.vicinity}</Text>
        {
          place?.opening_hours &&
          <Text style={[{ color: place?.opening_hours?.open_now ? "#2E8B57" : "#E97451" }, styles.open]}>{place?.opening_hours?.open_now ? "Open now" : "Closed"}</Text>
        }
      </View>
      <ModalComponent
        modalVisible={modalVisible}
        message={message}
        setMessage={setMessage}
        username={username}
        handleMessageCancel={handleMessageCancel}
        handleMessageSend={handleMessageSend}
      />
    </Pressable>
  )
}

export default PlaceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    elevation: 3,
    marginHorizontal: 6,
    marginVertical: 10,
    borderRadius: 6,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderLeftWidth: 3,
  },
  placeName: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  name: {
    fontSize: 16,
    paddingLeft: 8,
    paddingVertical: 2,
    fontFamily: "Lato-Black"
  },
  rating: {
    fontFamily: "Lato-Light"
  },
  voter: {
    fontFamily: "Lato-Regular"
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginTop: 3,
  },
  rating: {
    flexDirection: "row",
    paddingVertical: 1,
  },
  vicinity: {
    paddingVertical: 4,
    fontSize: 14,
    fontFamily: "Lato-Regular"
  },
  type: {
    fontFamily: "Lato-Bold"
  },
  open: {
    fontFamily: "Lato-Bold"
  }
})