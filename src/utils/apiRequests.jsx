import apiClient from "./apiClient";

export const nearByPlaces = (latitude,longitude,type) => {
 return apiClient.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=1500&type=${type}&key=${apiClient.mapApiKey}`)
}

export const geocodeWithLatlong = (lat,long) => {
  return apiClient.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiClient.mapApiKey}`)
}

export const geocodeWithAddress = (address) => {
 return apiClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiClient.mapApiKey}`)
}