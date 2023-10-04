import { StyleSheet, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const GetStars = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<MaterialIcons key={i} name="star" size={21} color="#FFA000" />);
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      stars.push(<MaterialIcons key={i} name="star-half" size={21} color="#FFA000" />);
    } else {
      stars.push(<MaterialIcons key={i} name="star-outline" size={21} color="#FFA000" />);
    }
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars}
    </View>
  );
};

export default GetStars;

