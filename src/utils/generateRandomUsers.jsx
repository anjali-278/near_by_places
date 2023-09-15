const randomInRange = (min, max) => Math.random() * (max - min) + min;

export function generateName() {
  const n1 = ['Mansur', 'Anjali', 'Priyanka', 'Rahul', 'Pavan', 'Nisha', 'Divya', 'Sireesha', 'Sai Krishana', 'Hema']
  const n2 = ['Mahammad', 'Pandey', 'Verma', 'Raina', 'Kumar', 'Metri', 'Sunkari', 'Tangudu', 'Krishana', 'Vasavi']
  return n1[Math.round(Math.random() * (n1.length - 1))];
}

const generateRandomUsers = (numUsers, inputLat, inputLng) => {
  const maxDistanceKm = 1.5;
  const users = [];

  for (let i = 0; i < numUsers; i++) {
    const lat = inputLat + randomInRange(-0.0135, 0.0135); 
    const lng = inputLng + randomInRange(-0.0135, 0.0135);

    const distance = Math.sqrt(
      Math.pow(lat - inputLat, 2) + Math.pow(lng - inputLng, 2)
    ) * 111;

    if (distance <= maxDistanceKm) {
      const user = {
        name: generateName(),
        types: ["user"],
        vicinity: `Address${Math.floor(Math.random() * 1000)}`,
        geometry: {
          location: {
            lat: lat,
            lng: lng,
          }
        }
      };
      users.push(user);
    }
  }

  return users;
};

export default generateRandomUsers;
