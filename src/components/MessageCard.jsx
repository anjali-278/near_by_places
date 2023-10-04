import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles as placeStyle } from './PlaceCard';


//date_time, id, message, msg_count, receiver_id, receiver_location, receiver_name, sender_id,
//sender_address,

const MessageCard = ({ messageData }) => {
	const senderId = "87487341";
	return (
		<LinearGradient
			colors={['#FFF0F5', '#E2F0FF']}
			style={[placeStyle.container, styles.container]}>
			<View style={styles.nameRow}>
				<View style={placeStyle.placeName}>
					<AntDesign name="user" size={22} />
					<Text style={placeStyle.name}>{messageData?.receiver_name || ""}
						{messageData?.message_count && messageData?.message_count > 1 && (
							<Text> ({messageData?.message_count})</Text>
						)}
					</Text>
				</View>
			</View>
			<View style={[placeStyle.placeName, styles.messageRow]}>
				<MaterialIcons name="message" size={22} color="#020035" />
				<Text style={styles.message}>{messageData?.message || ""}</Text>
			</View>
			<View style={styles.dateTime}>
				<View style={styles.textIcon}>
				<MaterialCommunityIcons name="clock-outline" size={22} color="#8E96A5" style={styles.timeIcon}/>
				<Text style={styles.small}>{messageData?.date_time?.time || ""}</Text>
				</View>
				<View style={styles.textIcon}>
					<MaterialIcons name="calendar-month" size={22} color="#8E96A5" style={styles.timeIcon}/>
				<Text style={styles.small}>{messageData?.date_time?.date || ""}</Text>
				</View>
			</View>
			<View style={styles.address}>
				<Text numberOfLines={2} style={styles.medium}><Text style={[placeStyle.type, styles.boldText]}>Receiver Address : </Text>{messageData?.receiver_location?.address || ""}</Text>
				<Text numberOfLines={2} style={styles.medium}><Text style={[placeStyle.type, styles.boldText]}>Sender Address : </Text>{messageData?.sender_address || ""}</Text>
			</View>
		</LinearGradient>
	)
}

export default MessageCard;

const styles = StyleSheet.create({
	container: {
		borderLeftWidth: 2,
		borderLeftColor: "#3A3A5B",
		borderBottomWidth: 1,
		borderBottomColor: "#3A3A5B"
	},
	dateTime: {
		flexDirection: "row",
		alignItems : "center",
		paddingTop: 2,
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#E0E6F1"
	},
	nameRow: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	message: {
		fontFamily: "Lato-Italic",
		paddingLeft: 8,
		fontSize: 16,
		color: "#3A3A5B"
	},
	messageRow: {
		paddingVertical: 4,
	},
	boldText: {
		color: "#6B6B8C"
	},
	small: {
		fontFamily: "Lato-Regular",
		fontSize: 12,
	},
	medium: {
		fontFamily: "Lato-Regular",
		fontSize: 13,
		paddingVertical: 5,
		lineHeight: 20,
		color: "#333333"
	},
	address: {
		paddingTop: 6,
	},
	textIcon : {
		flexDirection : "row",
		alignItems : "center",
		justifyContent : "center",
		marginRight : 16,
	},
	timeIcon : {
		paddingRight : 4,
	}
})