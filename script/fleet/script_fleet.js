console.log('Executing script_fleet.js');

import { getLocationData } from './getLocation.js';
import { getFleetData } from './getLPlate.js'; // Import the new function

// Function to get the access token from localStorage
function getAccessToken() {
    return localStorage.getItem('accessToken');
}

const accessToken = getAccessToken();

let map;
let infoWindow;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // ... existing code ...

        // Establish WebSocket connection
        const ws = new WebSocket('ws://localhost:3000'); // Use your server's URL

        // Fetch and update data every 5 seconds (you can adjust the interval as needed)
        setInterval(async () => {
            try {
                const accessToken = getAccessToken();
                const locationData = await getLocationData(accessToken);

                // Update the UI or do something with the new location data
                console.log('Received updated location data:', locationData);

                // Your existing logic to update markers based on new data
                // ...

            } catch (error) {
                console.error(`Error fetching/updating data: ${error.message}`);
            }
        }, 5000); // 5000 milliseconds = 5 seconds

        ws.addEventListener('message', (event) => {
            // WebSocket message handling logic
            // ...

        });

    } catch (error) {
        console.error(`Error initializing map: ${error.message}`);
        // Handle error gracefully, show a message to the user, etc.
    }
});

// // Function to get fleet data by fleetId using Axios
// async function getFleetDataById(fleetId, accessToken) {
//     try {
//         // Call getLocationData function to retrieve the fleet data
//         const locationData = await getLocationData(accessToken);

//         // Find the fleet data by fleetId
//         const fleetData = locationData.find(location => location.fleetId === fleetId);

//         return fleetData || null;
//     } catch (error) {
//         console.error(`Error fetching fleet data for fleetId ${fleetId}: ${error.message}`);
//         return null;
//     }
// }

// export { getFleetDataById };


// Function to find a marker by fleetId
function findMarkerByFleetId(fleetId) {
    // Iterate over markers to find the one with the matching fleetId
    for (const marker of map.markers || []) {
        const markerFleetId = marker.title;
        const markerFleet = marker.fleetData;

        if (markerFleetId === fleetId) {
            return marker;
        }

        // Check if fleetData is available and has the same fleetId
        if (markerFleet && markerFleet.id === fleetId) {
            return marker;
        }
    }
    return null; // Marker not found
}

// Function to find a location by fleetId
function findLocationByFleetId(locationData, fleetId) {
    return locationData.find(location => location.fleetId === fleetId);
}

// Define initMap as a global function
window.initMap = async function () {
    console.log('Initializing map');
    try {
        // Get the access token dynamically
        // const accessToken = getAccessToken();

        if (!accessToken) {
            // Handle the case when the access token is not available
            console.error('Access token not found. Please log in.');
            return;
        }

        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -6.914744, lng: 107.609810 },
            zoom: 13,
        });

        infoWindow = new google.maps.InfoWindow();

        const locationData = await getLocationData(accessToken); // Pass the access token to the function

        // Fetch fleet data
        const fleetData = await getFleetData(accessToken);

        // Iterate over fleetData to fetch additional information
        for (const fleet of fleetData) {
            const location = findLocationByFleetId(locationData, fleet.id);
        
            if (location) {
                const marker = addMarker(location, fleet);
                
                // Do something with fleet data (e.g., display it on the marker's info window)
                if (marker) {
                    marker.infoWindow.setContent(`<strong>${fleet.licencePlate}</strong> <br> Type: ${fleet.type} <br> Route: ${fleet.route.start} to ${fleet.route.finish} <br> Active: ${fleet.active}`);
                }
            }
        
            // Additional code...
        }
    } catch (error) {
        console.error(`Error initializing map: ${error.message}`);
        // Handle error gracefully, show a message to the user, etc.
    }
};

function addMarker(location, fleetData) {
    try {
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(location.location.lat), lng: parseFloat(location.location.lon) },
            map: map,
            title: fleetData.licencePlate || fleetData.type || 'Unknown',
            icon: {
                url: '../../img/bus.png',
                scaledSize: new google.maps.Size(36, 36),
            },
        });

        marker.addListener('click', () => {
            const content = `<strong>${marker.title}</strong> <br> Coordinates: ${location.location.lat}, ${location.location.lon} <br> Route: ${fleetData.route.start} to ${fleetData.route.finish}`;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        });

        // Attach the infoWindow to the marker for later use
        marker.infoWindow = infoWindow;
        // Attach fleetData to the marker for later use
        marker.fleetData = fleetData;

        // Make the marker "blink" by changing its icon every 2 seconds
        setInterval(() => {
            const currentIcon = marker.getIcon();
            const newIconUrl = currentIcon.url === '../../img/bus.png' ? '../../img/bus_blink.png' : '../../img/bus.png';
            
            marker.setIcon({
                url: newIconUrl,
                scaledSize: new google.maps.Size(46, 46),
            });
        }, 500); // Change the icon every 2 seconds

        return marker;
    } catch (error) {
        console.error(`Error adding marker: ${error.message}`);
        // Handle error gracefully, show a message to the user, etc.
        return null;
    }
}


console.log('Executing script_fleet.js again ;D');

//marker.infoWindow.setContent(`<strong>${fleet.licencePlate}</strong> <br> Type: ${fleet.type} <br> Route: ${fleet.route.start} to ${fleet.route.finish} <br> Active: ${fleet.active} <br> <button>Details</button>`);