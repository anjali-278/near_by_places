import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const BackgroundVideo = () => {
  return (
    // <View style={styles.container}>
      <Video
        source={{uri : "https://github.githubassets.com/images/modules/site/home/globe-900.hevc.mp4"}} // Replace with the correct path to your video
        style={styles.backgroundVideo}
        repeat={true}
        resizeMode="cover"
        muted={true}
        playInBackground={false}
        playWhenInactive={false}
      />
    // </View>
  );
};

const styles = StyleSheet.create({
  
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default BackgroundVideo;
