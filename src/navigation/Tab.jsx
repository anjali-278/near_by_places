import { Map, Profile, Messages } from "../modules";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case "Map":
                return <MaterialCommunityIcons name="map-marker" color={color} size={size} />
              case "PlaceList":
                return <Entypo name="list" size={size} color={color} />
              case "Profile":
                return <AntDesign name="user" size={size} color={color} />
              case "Messages":
                return <MaterialCommunityIcons name="message-outline" color={color} size={size} />
            }
          },
          tabBarActiveTintColor: '#020035',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Map" component={Map} initialParams={{ showMap: true }} />
        <Tab.Screen name="PlaceList" component={Map} initialParams={{ showMap: false }} />
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigation;