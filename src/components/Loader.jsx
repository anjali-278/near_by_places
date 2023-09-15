import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#020035" />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})