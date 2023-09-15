import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Toast from 'react-native-toast-message';

import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import placeColors from '../constants/placeColor';
import ModalComponent from './ModalComponent';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getLatlng } from '../modules/map/redux/slices/latlng';

const Mapview = () => {
  const latLng = useSelector(state => state.latLng);
  const places = useSelector(state => state.places.places);
  const currentLocation = useSelector(state => state.location)

  const [username, setUsername] = useState("UserName");
  const [message, setMessage] = useState("")
  const [modalVisible, setModalVisible] = useState(false);


  const dispatch = useDispatch();

  const handleCalloutPress = (name) => {
    setModalVisible(true);
    setUsername(name);
  }

  handleMessageCancel = () => {
    setModalVisible(false);
    setUsername("");
    setMessage("")
  }

  handleMessageSend = () => {
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
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: latLng?.latitude || 17.387140,
              longitude: latLng?.longitude || 78.491684,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            // onRegionChange={(newRegion) => (dispatch(getLatlng({newRegion})))}
          >
            <Marker
            coordinate={{
              latitude : currentLocation?.location?.coords?.latitude,
              longitude : currentLocation?.location?.coords?.longitude,
            }}
            pinColor='yellow'
            title='You are here'
            >
              <MaterialIcons name="my-location" size={32} color="#0074D9"/>
            </Marker>
            {places.length ?
              places.map((obj, index) => {
                return (
                  <Marker
                    key={String(index)}
                    coordinate={{
                      latitude: obj?.geometry?.location?.lat,
                      longitude: obj?.geometry?.location?.lng,
                    }}
                    title={obj?.name}
                    onCalloutPress={() => { obj?.types.includes("user") && handleCalloutPress(obj?.name || "Username") }}
                    pinColor={obj?.types.includes("hospital") ?
                      placeColors.hospital : obj?.types.includes("police") ?
                        placeColors.police :
                        obj?.types.includes("user") ?
                          placeColors.users :
                          null}
                  >
                    {obj?.types.includes("user") &&
                      <MaterialIcons name="location-history" color={placeColors.users} size={32}/>
                    }
                  </Marker>
                )
              }) : null}
          </MapView>
        </View>
      </TouchableWithoutFeedback>
      <ModalComponent
        modalVisible={modalVisible}
        message={message}
        setMessage={setMessage}
        username={username}
        handleMessageCancel={handleMessageCancel}
        handleMessageSend={handleMessageSend}
      />
    </>
  )
}

export default Mapview;

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: -1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
})