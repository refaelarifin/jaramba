// postLocation.js

// import axios from 'axios';

export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lon: longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by your browser."));
    }
  });
}

export async function postLocation() {
  try {
    const currentLocation = await getCurrentLocation();
    const timestamp = new Date().toISOString();

    // Replace 'YOUR_FLEET_ID' and 'YOUR_DRIVER_ID' with actual values
    const fleetId = 'Bus18120057';
    const driverId = 'driver18120057';

    const response = await axios.post('http://34.101.109.44:3000/v1/fleetLocations', {
      fleetId: fleetId,
      driverId: driverId,
      location: currentLocation,
      timestamp: timestamp,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVkYWY2YzU3ZDQxMmUwZWRiYTYyMDIiLCJpYXQiOjE3MDEyMzg5MzgsImV4cCI6MTcwMTMyNTMzOH0.71XZNavahd1FiGg1TYlCwOkgxyZEQp_gj41UHBS7A_k', // Replace with your access token
      },
    });

    console.log(response.data); // Log the response from the server
  } catch (error) {
    console.error(`Error posting location data: ${error.message}`);
  }
}
