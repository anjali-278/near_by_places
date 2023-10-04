import { geocodeWithLatlong } from "./apiRequests";

const randomInRange = (min, max) => Math.random() * (max - min) + min;

export function generateName() {
  const n1 = [{ id: 1, name: 'Mansur', }, { id: 2, name: 'Anjali', }, { id: 3, name: 'Priyanka', }, { id: 4, name: 'Rahul', }, { id: 5, name: 'Pavan', }, { id: 6, name: 'Nisha', }, { id: 7, name: 'Divya', }, { id: 8, name: 'Sireesha', }, { id: 9, name: 'Sai Krishana', }, { id: 10, name: 'Hema', }]
  return n1[Math.round(Math.random() * (n1.length - 1))];
}

const generateRandomUsers = async (numUsers, inputLat, inputLng) => {
  const maxDistanceKm = 1.5;
  const users = [];

  let vicinity;

  for (let i = 0; i < numUsers; i++) {
    const lat = inputLat + randomInRange(-0.0135, 0.0135);
    const lng = inputLng + randomInRange(-0.0135, 0.0135);


    const response = await geocodeWithLatlong(lat, lng);

    vicinity = response.results[0].formatted_address;

    // geocodeWithLatlong(lat, lng)
    // .then(res => {
    //   console.log("--------------response of geocodeWithLatlong--------->",res.results[0].formatted_address)
    //   vicinity = res.results[0].formatted_address;
    // })




    const distance = Math.sqrt(
      Math.pow(lat - inputLat, 2) + Math.pow(lng - inputLng, 2)
    ) * 111;

    if (distance <= maxDistanceKm) {
      let userObj = generateName();
      // console.log('check----------->', userObj);
      // console.log("--------address----------->", vicinity)
      const user = {
        id: userObj.id,
        name: userObj.name,
        types: ["user"],
        vicinity: vicinity || `Address${Math.floor(Math.random() * 1000)}`,
        lat: lat,
        lng: lng,
      };
      users.push(user);
    }
  }

  return users;
};

export default generateRandomUsers;
