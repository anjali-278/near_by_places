import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { getLatlng } from '../modules/map/redux/slices/latlng';
import { clearPlace } from '../modules/map/redux/slices/selectedPlace';

const Mylocation = () => {

  const dispatch = useDispatch();

  const handleLocationPress = () => {
    dispatch(getLatlng({
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
    }));
    dispatch(clearPlace());
  }

  const location = useSelector(state => state.location.location);
  const currentLocationAddress = useSelector(state => state.locationAddress.address);

  
  return (
    <Pressable
      style={styles.header}
      onPress={handleLocationPress}
    >
      <Entypo name="location" size={32} color="white" />
      <Text style={styles.address}>{currentLocationAddress[0]?.formatted_address || "Your Current Address"}</Text>
    </Pressable>
  )
}

export default Mylocation

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height:100, 
  },
  address: {
    fontSize : 16,
    paddingLeft: 12,
    color : "white",
    fontFamily : "Lato-Regular"
  },
})