import { StyleSheet, View, PermissionsAndroid, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';

// import { useIsFocused } from '@react-navigation/native';
import { PERMISSIONS, request } from 'react-native-permissions';


import { Mapview, Mylocation, PlacesAutocomplete, Places } from '../../components';
import { permissionGranted } from './redux/slices/locationPermission';
import { getLocation } from './redux/slices/location';
import { getLatlng } from './redux/slices/latlng';
import { placesRequested } from './redux/slices/places';
import { addressRequested } from './redux/slices/currentLocationAddress';

import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';

import Geolocation from 'react-native-geolocation-service';

import { setSelectedPlace } from './redux/slices/selectedPlace';

const Map = ({ navigation,location, hasLocationPermission, latLng,  route, selectedPlace, getLatlng, getLocation, placesRequested, addressRequested, permissionGranted  }) => {

  // const dispatch = useDispatch();

  // const hasLocationPermission = useSelector(state => state.locationPermission.locationPermission);
  // const location = useSelector(state => state.location.location);
  // const latLng = useSelector(state => state.latLng);

  
  // const selectedPlace = useSelector(state => state.selectedPlace.address);
  
  console.log("-------selected place-------->", selectedPlace)

  let { showMap } = route.params;


  async function requestLocationPermission() {

    // request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
    //   if(result == "granted"){
    //     dispatch(permissionGranted())
    //   }
    //   console.log("permissionResult---------------->",result)
    // });


    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        permissionGranted()
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }


  useEffect(() => {
    requestLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          getLocation(position)
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }
    , [hasLocationPermission])

    
    console.log("checking for location------------->",location)


  useEffect(() => {

    // console.log("-----------places-------->",places)

    getLatlng({
      latitude: latLng.latitude || location?.coords?.latitude,
      longitude: latLng.longitude || location?.coords?.longitude,
    })


    addressRequested({
      latitude: location?.coords?.latitude || 17.387140,
      longitude: location?.coords?.longitude || 78.491684,
    })

  }, [location])

  useEffect(() => {
    
    // let excuteInitially = showMap ? true : false;


    console.log("----------latlng------------->",latLng)
    
    placesRequested({
      latitude: latLng?.latitude || 17.387140,
      longitude: latLng?.longitude || 78.491684,
    });

    // excuteInitially = true
  
  }, [latLng])

  // console.log("places--------------->",places)
  // console.log("locationpermission----------------------->", hasLocationPermission);
  // console.log("location-------------------------->", location);
  // console.log("places--------------------------->",places)
      

      useEffect(() => {
        console.log(selectedPlace , "------------selected place inside app component")
      },[selectedPlace])

  return (

    <>

      <StatusBar backgroundColor={"#020035"} />
      {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Mylocation />
          <PlacesAutocomplete />
        </View>
        <View style={styles.content}>
          {
            showMap ?
              <Mapview /> :
              <Places />
          }
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}

    </>

  )
}

const mapStateToProps = (state, props) => {
  return {
    selectedPlace : state.selectedPlace.address,
    hasLocationPermission : state.locationPermission.locationPermission,
    location : state.location.location,
    latLng : state.latLng,
  };

};

const mapDispatchToProps = (dispatch) => ({
  setSelectedPlace : (text) => dispatch(setSelectedPlace(text)),
  getLatlng : (data) => dispatch(getLatlng(data)),
  getLocation : (data) => dispatch(getLocation(data)),
  addressRequested : (data) => dispatch(addressRequested(data)),
  placesRequested : (data) => dispatch(placesRequested(data)),
  permissionGranted : () => permissionGranted(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  header: {
    flex: 1,
    backgroundColor: "#020035",
    borderRadius: 2,
    shadowColor: "black",
    elevation: 5,
  },
  content: {
    flex: 4,
  },
})

