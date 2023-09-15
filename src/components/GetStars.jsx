import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const GetStars = ({ rating }) => {
  rating = Math.round(rating * 2) / 2;

  let stars = [];

  for (var i = rating; i >= 1; i--)
    stars.push(<MaterialIcons name="star" size={21} color="#FFA000" />);
  if (i == .5) stars.push(<MaterialIcons name="star-half" size={21} color="#FFA000" />);
  for (let i = (5 - rating); i >= 1; i--)
    stars.push(<MaterialIcons name="star-outline" size={21} color="#FFA000" />);



  return (
    <View style={styles.container}>
      {stars.map((star, i) => <Text key={String(i)}>{star}</Text>)}
    </View>
  );
}

export default GetStars

const styles = StyleSheet.create({
  container : {
    flexDirection : "row"
  }
})