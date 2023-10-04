import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
   name: "messages",
   initialState:
      [
         {
            "date_time": { "date": "04 Oct 2023", "time": "11:32 AM" },
            "id": "1696399357122-9202",
            "message": "Good morning",
            "message_count": 1,
            "receiver_id": 2,
            "receiver_location": {
               "address": "Plot No.16, Palace Ananth, Nandana Heights, Jubilee Enclave, HITEC City, Hyderabad, Telangana 500081, India",
               "latitude": 17.451726173075606,
               "longitude": 78.38002580619018
            },
            "receiver_name": "Anjali",
            "sender_address": "C9VM+Q2W, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana 500081, India"
         },
         {
            "date_time": { "date": "04 Oct 2023", "time": "11:32 AM" },
            "id": "1696399376011-5653",
            "message": "Hi",
            "message_count": 1,
            "receiver_id": 7,
            "receiver_location": {
               "address": "T Hub Phase-2, SALARPURIA SATTVA KNOWLEDGE CITY, Silpa Gram Craft Village, Madhapur, Hyderabad, Telangana 500081, India",
               "latitude": 17.433643463566195,
               "longitude": 78.37942171476024
            },
            "receiver_name": "Divya",
            "sender_address": "C9VM+Q2W, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana 500081, India"
         },
         {
            "date_time": { "date": "04 Oct 2023", "time": "11:33 AM" },
            "id": "1696399396385-4108",
            "message": "Have a nice day",
            "message_count": 1,
            "receiver_id": 3,
            "receiver_location": {
               "address": "C9JM+W29 SALARPURIA SATTVA KNOWLEDGE CITY, Silpa Gram Craft Village, HITEC City, Hyderabad, Telangana 500081, India",
               "latitude": 17.43252799191078,
               "longitude": 78.38256409689323
            },
            "receiver_name": "Priyanka",
            "sender_address": "C9VM + Q2W, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana 500081, India"
         },
         {
            "date_time": { "date": "04 Oct 2023", "time": "11: 34 AM" },
            "id": "1696399490036 - 5021",
            "message": "Happy wednesday",
            "message_count": 1,
            "receiver_id": 1,
            "receiver_location": {
               "address": "4 Rue Charlemagne, 75004 Paris, France",
               "latitude": 48.85475288618114,
               "longitude": 2.3601647639503014
            },
            "receiver_name": "Mansur",
            "sender_address": "C9VM + Q2W, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana 500081, India"
         },
         {

            "date_time": { "date": "04 Oct 2023", "time": "11: 35 AM" },
            "id": "1696399521674 - 9158",
            "message": "Last message",
            "message_count": 1,
            "receiver_id": 6,
            "receiver_location": {
               "address": "171 Rue du Temple, 75003 Paris, France", "latitude": 48.86528846926338,
               "longitude": 2.359388272331389
            },
            "receiver_name": "Nisha",
            "sender_address": "C9VM + Q2W, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana 500081, India"
         }
      ],
   reducers: {
      addMessage: (state, action) => {
         state.push(action.payload)
      },
      updateMessage: (state, action) => {
         const { existingMessageIndex, updatedMessage } = action.payload;
         state.splice(existingMessageIndex, 1);
         state.push(updatedMessage);
      }
   }
})

export const { addMessage, updateMessage } = messageSlice.actions;
export default messageSlice.reducer;