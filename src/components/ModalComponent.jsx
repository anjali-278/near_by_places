import { StyleSheet, Text, View, Modal, TextInput, Pressable} from 'react-native';
import React from 'react'

const ModalComponent = ({modalVisible, message, setMessage, username, handleMessageCancel, handleMessageSend }) => {
  return (
    <Modal
          visible={modalVisible}
          transparent={true}
          style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalCard}>
            <TextInput
              value={message}
              onChangeText={e => setMessage(e)}
              style={styles.messageInput}
              placeholder={`Send message to ${username}`}
            />
            <View style={styles.buttonContainer}>
             <Pressable onPress={handleMessageCancel} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
             </Pressable>
             <Pressable onPress={handleMessageSend} style={styles.button}>
             <Text style={styles.buttonText}>Send</Text>
             </Pressable>
            </View>
            </View>
          </View>
        </Modal>
  )
}

export default ModalComponent;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        marginTop: 22,
        borderWidth: 1,
      },
      modal: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      modalCard: {
        width: 300,
        height: 150,
        justifyContent : "space-evenly",
        backgroundColor : "#FFFFFF",
        elevation : 2,
        borderRadius : 8,
        padding : 6,
      },
      buttonContainer : {
        flexDirection : "row",
        justifyContent : "space-around"
      },
      messageInput : {
        paddingBottom : 10,
        borderBottomColor : "#020035",
        borderBottomWidth : 1,
      },
      button : {
        backgroundColor : "#020035",
        paddingVertical : 8,
        paddingHorizontal : 20,
        borderRadius : 5,
      },
      buttonText : {
        color : "#FFFFFF",
        fontFamily : "Lato-Bold",
        fontSize : 18,
      },
      name :{
        fontSize : 18,
        color : "#020035",
        fontFamily : "Lato-Bold",
        textAlign : "center"
      }
})