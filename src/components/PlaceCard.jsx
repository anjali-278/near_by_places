import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import React, { useMemo, useState } from 'react';
import GetStars from './GetStars';
import placeColors from '../constants/placeColor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { showModal } from '../modules/map/redux/slices/modalVisible';
import { setDraftValue } from '../modules/messages/redux/messageDraftSlice';
import { useDispatch } from 'react-redux';


const { width, height } = Dimensions.get("window");



const PlaceCard = ({ place }) => {

  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();
  const handleUserPressed = (receiverData) => {
    dispatch(showModal());
    dispatch(setDraftValue(
      {
        receiver_id: receiverData?.id || "receiver_id",
        receiver_name: receiverData?.name || "name",
        receiver_location: {
          latitude: receiverData?.lat || 0,
          longitude: receiverData?.lng || 0,
          address: receiverData?.vicinity || "",
        }
      }
    ))
  }

  const handlePlacePressed = () => {
    setShowDetails(true);
  }

  const openStyle = {
    color: place?.opening_hours?.open_now ? "#2E8B57" : "#E97451",
  };

  const borderLeft = {
    borderLeftWidth: 3,
    borderLeftColor: place?.types.includes("hospital") ?
      placeColors.hospital : place?.types.includes("police") ?
        placeColors.police : placeColors.users
  }

  const icon = place?.types.includes("user") ?
    <AntDesign name="user" color={placeColors.users} size={22} /> :
    place?.types.includes("hospital") ?
      <FontAwesome5 name="hospital" color={placeColors.hospital} size={22} /> :
      <MaterialCommunityIcons name="police-station" color={placeColors.police} size={22} />

  console.log(showDetails);
  return useMemo(() =>
  (
    <>
      <Pressable onPress={() => place?.types?.includes("user") ? handleUserPressed(place) : handlePlacePressed()}
        // android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
      >
        <View style={[styles.container, borderLeft]}>
          <View style={styles.placeName}>
            {icon}
            <Text style={styles.name}>{place?.name}</Text>
          </View>
          <View style={[styles.rating, { borderColor: "black" }]}>
          </View>
          <Text style={styles.bold}>{place?.types[0]}</Text>
          <Text style={styles.vicinity}>{place?.vicinity}</Text>
        </View>
      </Pressable>
      {
        showDetails &&
        <Modal
          visible={showDetails}
          transparent={true}
          style={styles.details}
        >
          <TouchableWithoutFeedback onPress={() => setShowDetails(false)} style={{ flex: 1 }}>
            <View style={styles.detailsModal}>
              <View style={styles.modalContent}>
                <View style={styles.placeName}>
                  {icon}
                  <Text style={styles.name}>{place?.name}</Text>
                </View>
                <View style={[styles.rating, { borderColor: "black" }]}>
                  {
                    place?.rating ?
                      <>
                        <Text style={styles.voter}>{place?.rating?.toFixed(1)}</Text>
                        <GetStars rating={place?.rating} />
                        <Text style={styles.voter}>({place?.user_ratings_total} ratings)</Text>
                      </>
                      :
                      <Text style={styles.voter}>No Ratings</Text>
                  }
                </View>
                <Text style={styles.bold}>{place?.types[0]}</Text>
                <Text style={styles.vicinity}>{place?.vicinity}</Text>
                {
                  place?.opening_hours &&
                  <Text style={[openStyle, styles.bold]}>{place?.opening_hours?.open_now ? "Open now" : "Closed"}</Text>
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      }
    </>
  ), [place, showDetails]
  )
}

export default React.memo(PlaceCard);

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    elevation: 3,
    marginHorizontal: 6,
    marginVertical: 10,
    borderRadius: 6,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  placeName: {
    flexDirection: "row",
    paddingVertical: 2,
    alignItems : "center",
  },
  name: {
    fontSize: 16,
    paddingLeft: 8,
    paddingVertical: 2,
    fontFamily: "Lato-Black"
  },
  voter: {
    fontFamily: "Lato-Regular"
  },
  icon: {
    height: width * 0.04,
    width: width * 0.04,
    resizeMode: "contain",
    marginTop: 3,
  },
  rating: {
    flexDirection: "row",
    paddingVertical: 1,
  },
  vicinity: {
    paddingVertical: 4,
    fontSize: 14,
    fontFamily: "Lato-Regular"
  },
  bold: {
    fontFamily: "Lato-Bold"
  },
  details: {
    flex: 1,
  },
  detailsModal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
  },
  modalContent: {
    width: "96%",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderRadius: 8,
    padding: 6,
    marginHorizontal: 8,
  }
})