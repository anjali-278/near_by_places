import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';


import {
  Mapview,
  Mylocation,
  PlacesAutocomplete,
  Places,
  ModalComponent
} from '../../components';

import { permissionGranted } from './redux/slices/locationPermission';
import { getLocation } from './redux/slices/location';
import { getLatlng } from './redux/slices/latlng';
import { placesRequested } from './redux/slices/places';
import { addressRequested } from './redux/slices/currentLocationAddress';



const Map = ({
  location,
  hasLocationPermission,
  latLng,
  route,
  getLatlng,
  getLocation,
  placesRequested,
  addressRequested,
  permissionGranted
}) => {


  // const [showMesssageBox, setShowMessageBox] = useState(false);
  let { showMap } = route.params;
  // const mountedRef = useRef();


  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Places App',
          'message': 'Places App access to your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        permissionGranted();
      } else {
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




  useEffect(() => {
      getLatlng({
        latitude: location?.coords?.latitude || 17.387140,
        longitude: location?.coords?.longitude || 78.491684,
      })

      addressRequested({
        latitude: location?.coords?.latitude || 17.387140,
        longitude: location?.coords?.longitude || 78.491684,
      })
  }, [location])

  useEffect(() => {
    placesRequested({
      latitude: latLng?.latitude || 17.387140,
      longitude: latLng?.longitude || 78.491684,
    });
  }, [latLng])

  // useEffect(() => {
  //   mountedRef.current = true;
  // },[])

  return (

    <>

      <StatusBar backgroundColor={"#020035"} />
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
        <ModalComponent />
      </View>
    </>

  )
}

const mapStateToProps = (state, props) => {
  return {
    hasLocationPermission: state.locationPermission.locationPermission,
    location: state.location.location,
    latLng: state.latLng,
  };

};

const mapDispatchToProps = (dispatch) => ({
  getLatlng: (data) => dispatch(getLatlng(data)),
  getLocation: (data) => dispatch(getLocation(data)),
  addressRequested: (data) => dispatch(addressRequested(data)),
  placesRequested: (data) => dispatch(placesRequested(data)),
  permissionGranted: () => dispatch(permissionGranted()),
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

