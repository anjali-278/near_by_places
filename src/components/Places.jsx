import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import PlaceCard from './PlaceCard';
import Loader from './Loader';


const Places = () => {

  const places = useSelector(state => state.places.places);
  const placesLoading = useSelector(state => state.places.loading);
  const placesError = useSelector(state => state.places.error);

  return (
    
    placesLoading?
    <Loader/> :
    placesError ?
    <View>
    <Text>{placesError}</Text>
    </View> 
    :
    <View style={{zIndex : -1,}}>
    <ScrollView>
      {(places || []).map((place, i) => <PlaceCard key={i} place={place} />)}
    </ScrollView>
     </View>
  );
};

export default Places;

const styles = StyleSheet.create({
})

