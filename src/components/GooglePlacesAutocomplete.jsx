import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import apiClient from '../utils/apiClient';
import { getLatlng } from '../modules/map/redux/slices/latlng';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlace } from '../modules/map/redux/slices/selectedPlace';

const PlacesAutocomplete = () => {

	const [isInputFocused, setInputFocused] = useState(false);

	const selectedPlace = useSelector(state => state.selectedPlace.address);
	const location = useSelector(state => state.location.location);

	const dispatch = useDispatch();


	const handleChange = (text) => {
		if (isInputFocused) {
			dispatch(setSelectedPlace(text));
		}
	}

	const handleBlur = () => {
		if (!selectedPlace) {
			dispatch(getLatlng({
				latitude: location?.coords?.latitude || 17.387140,
				longitude: location?.coords?.longitude || 78.491684,
			}))
		}
	}

	const handleSelect = (latitude, longitude, description) => {
		dispatch(getLatlng({
			latitude: latitude,
			longitude: longitude,
		}));
		{
			description ?
				dispatch(setSelectedPlace(description)) :
				null
		}
	}


	return (
		<View style={styles.searchAddress}>
			<GooglePlacesAutocomplete
				textInputProps={{
					value: selectedPlace,
					onChangeText: (text) => { handleChange(text) },
					onFocus: () => setInputFocused(true),
					onBlur: () => handleBlur(),
				}}
				placeholder='Search'
				fetchDetails={true}
				onPress={(data, details = null) => {
					handleSelect(details?.geometry?.location?.lat, details?.geometry?.location?.lng, data?.description)
				}}
				query={{
					key: apiClient.mapApiKey,
					language: 'en',
				}}
				minLength={3}
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