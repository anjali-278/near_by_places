import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import MessageCard from '../../components/MessageCard';

const Messages = () => {

  const messages = useSelector(state => state.messages);

  const reverseMessage = [...messages].reverse();
  // console.log("--------------messages----------->", messages)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <ScrollView>
        {(reverseMessage || []).map(message =>
          <MessageCard key={String(message.id)} messageData={message}
          />)}
      </ScrollView>
      {/* <FlatList
      data={reverseMessage}
      renderItem={({item}) => <MessageCard messageData={item}/>}
      keyExtractor={item => String(item.id)}
      /> */}
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#020035",
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "#FFFFFF",
    fontFamily: "Lato-Bold",
    fontSize: 21,
  }
})