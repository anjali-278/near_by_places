import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import apiClient from '../utils/apiClient';
import { getLatlng } from '../modules/map/redux/slices/latlng';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlace } from '../modules/map/redux/slices/selectedPlace';
import { connect } from 'react-redux';

const PlacesAutocomplete = () => {

    const selectedPlace = useSelector(state => state.selectedPlace.address)
    const dispatch = useDispatch();
    // console.log("===========selectedPlace====>", selectedPlace)

    // useEffect(() => {
    //     if (selectedPlace) {
    //         dispatch(setSelectedPlace(selectedPlace.description));
    //     } else {
    //         dispatch(setSelectedPlace(''));
    //     }
    //   }, [selectedPlace]);  


    return (
        <View style={styles.searchAddress}>
            <GooglePlacesAutocomplete
                textInputProps={{
                 value : selectedPlace,
                 onChangeText : (text) => dispatch(setSelectedPlace(text))
                }}
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    console.log("--------data from googleautocomplete-------->", data)
                    dispatch(getLatlng({
                        latitude: details?.geometry?.location?.lat,
                        longitude: details?.geometry?.location?.lng,
                    }));
                    dispatch(setSelectedPlace(data.description))
                }}
                query={{
                    key: apiClient.mapApiKey,
                    language: 'en',
                }}
                // currentAddress={selectedPlace}

            // value = {selectedPlace.description}
            />
        </View>
    )
}

// const mapStateToProps = (state, props) => {
//     return {
//       selectedPlace : state.selectedPlace.address,
//     };
  
//   };

//   const mapDispatchToProps = (dispatch) => ({
//     setSelectedPlace : (text) => dispatch(setSelectedPlace(text)),
//     getLatlng : (data) => dispatch(getLatlng(data)),
//   });

export default PlacesAutocomplete;

const styles = StyleSheet.create({
    searchAddress: {
        zIndex: 5,
        width: "96%",
        position: "absolute",
        top: 90,
        marginHorizontal: 6,
        backgroundColor: "#FFFFFF",
        elevation: 3,
        borderRadius: 4,
    },
})