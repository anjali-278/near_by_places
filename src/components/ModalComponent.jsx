import { StyleSheet, Text, View, Modal, TextInput, Pressable } from 'react-native';
import React from 'react';
import { setDraftValue } from '../modules/messages/redux/messageDraftSlice';
import { clearDraft } from '../modules/messages/redux/messageDraftSlice';
import { addMessage, updateMessage } from '../modules/messages/redux/messageSlice';
import { hideModal } from '../modules/map/redux/slices/modalVisible';
import dayjs from 'dayjs';

import Toast from 'react-native-toast-message';

import { useDispatch, useSelector } from 'react-redux';

const ModalComponent = () => {

  const dispatch = useDispatch();
  const messageDraft = useSelector(state => state.messageDraft);
  const message = useSelector(state => state.messageDraft.message);
  const senderAddress = useSelector(state => state.locationAddress?.address[0]?.formatted_address);
  const messageList = useSelector(state => state.messages);
  const currentReceiverID = useSelector(state => state.messageDraft.receiver_id);
  const modalVisible = useSelector(state => state.modalVisible.show);

  // console.log("----------list of the messages--------->", messageList)
  // console.log("-----------current receiver id --------->", currentReceiverID)

  const handleMessageChange = (message) => {
    dispatch(setDraftValue({
      message: message,
    }))
  }

  const handleMessageCancel = () => {
    dispatch(hideModal())
    dispatch(clearDraft());
  }

  const handleMessageSend = () => {
    const date = new Date();
    const timeStamp = Date.now();
    const uniquePart = Math.floor(Math.random() * 10000);
    const uniqueID = `${timeStamp}-${uniquePart}`;

    const newMessage = {
      ...messageDraft,
      id: uniqueID,
      date_time: {
        date: dayjs(date).format('DD MMM YYYY'),
        time: dayjs(date).format('h:mm A')
      },
      sender_address: senderAddress,
    }

    const existingMessageIndex = messageList.findIndex((message) => message.receiver_id === currentReceiverID);


    if (existingMessageIndex !== -1) {
      const existingMessage = messageList[existingMessageIndex];
      // console.log("---------existingMessage count-------",existingMessage.message_count)
      dispatch(updateMessage({
        existingMessageIndex,
        updatedMessage: {
          ...newMessage,
          message_count: (existingMessage?.message_count || 1) + 1,
        }
      }))
    }
    else {
      dispatch(addMessage({
        ...newMessage,
        message_count: 1,
      }))
    }

    Toast.show({
      visibilityTime : 2000,
      type: "success",
      text1: `Message Send to ${messageDraft.receiver_name}`,
      text2: `Address : ${messageDraft.receiver_location.address}`,
    })

    dispatch(hideModal());
    dispatch(clearDraft());
  }

  // console.log("---------sender address----------->", senderAddress)s

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.modalCard}>
          <TextInput
            value={message}
            onChangeText={(message) => handleMessageChange(message)}
            style={styles.messageInput}
            placeholder={`Send message to ${messageDraft.receiver_name}`}
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
  // modalContainer: {
  //   flex: 1,
  //   marginTop: 22,
  //   borderWidth: 1,
  // },
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
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderRadius: 8,
    padding: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  messageInput: {
    paddingBottom: 10,
    borderBottomColor: "#020035",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#020035",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Lato-Bold",
    fontSize: 18,
  },
  name: {
    fontSize: 18,
    color: "#020035",
    fontFamily: "Lato-Bold",
    textAlign: "center"
  }
})