import React, { createRef } from 'react';

import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Pressable,
} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import placeColors from '../constants/placeColor';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getLatlng } from '../modules/map/redux/slices/latlng';
import { clearPlace } from '../modules/map/redux/slices/selectedPlace';
import { setDraftValue } from '../modules/messages/redux/messageDraftSlice';
import { showModal } from '../modules/map/redux/slices/modalVisible';

const Mapview = () => {
  const latLng = useSelector(state => state.latLng);
  const places = useSelector(state => state.places.places);
  const currentLocation = useSelector(state => state.location);

  const mapRef = createRef();
  const dispatch = useDispatch();

  const handleCalloutPress = (receiverData) => {
    dispatch(showModal());

    dispatch(setDraftValue({
      receiver_id: receiverData?.id || "receiver_id",
      receiver_name: receiverData?.name || "name",
      receiver_location: {
        latitude: receiverData.lat,
        longitude: receiverData.lng,
        address: receiverData.vicinity,
      }
    }))
  }

  const handleMyLocationPress = () => {
    currentLocation?.location?.coords ?
      (dispatch(getLatlng({
        latitude: currentLocation?.location?.coords?.latitude,
        longitude: currentLocation?.location?.coords?.longitude,
      })),
        mapRef.current.animateToRegion({
          latitude: currentLocation?.location?.coords?.latitude,
          longitude: currentLocation?.location?.coords?.longitude,
          latitudeDelta: 0.034,
          longitudeDelta: 0.02,
        }),
        dispatch(clearPlace())
      ) :
      alert("Please Check Your Location Permission")
  }


  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: latLng?.latitude || 17.387140,
              longitude: latLng?.longitude || 78.491684,
              latitudeDelta: 0.034,
              longitudeDelta: 0.02,
            }}
            showsUserLocation={true}
            showsMyLocationButton={false}
          >
            <Circle
              key={(latLng?.latitude + latLng?.longitude).toString()}
              center={{
                latitude: latLng?.latitude || 17.387140,
                longitude: latLng?.longitude || 78.491684,
              }}
              radius={1500}
              strokeWidth={1}
              strokeColor={'#1a66ff'}
              fillColor={'rgba(230,238,255,0.5)'} />

            {places.length ?
              places.map((obj, index) => {
                const icon = obj?.types.includes("user") ?
                  <MaterialIcons name="location-history" color={placeColors.users} size={32} /> :
                  obj?.types.includes("hospital") ?
                    <FontAwesome5 name="hospital" color={placeColors.hospital} size={24} /> :
                    <MaterialCommunityIcons name="police-station" color={placeColors.police} size={24} />

                return (
                  <Marker
                    key={String(index)}
                    coordinate={{
                      latitude: obj?.lat,
                      longitude: obj?.lng,
                    }}
                    title={obj?.name}
                    onCalloutPress={() => { obj?.types.includes("user") && handleCalloutPress(obj || {}) }}
                  >
                    {icon}
                  </Marker>
                )
              }) : null}
          </MapView>

          <View style={styles.locationBox}>
            <Pressable
              onPress={handleMyLocationPress}
            >
              <MaterialIcons name="my-location" color={"#0074D9"} size={40} />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  locationBox: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#FFFFFF",
    padding: 7,
    borderRadius: 8,
    elevation: 4,
  }
})