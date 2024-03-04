// import axios from 'axios';

async function getLocationData(accessToken) {
    try {
        const response = await axios.get('http://34.125.67.146:3000/v1/fleetLocations', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${accessToken}`, // Use the dynamically retrieved access token
            },
        });

        const locationData = response.data;

        // Map locations and parse timestamps
        const fleetLocations = locationData.map(location => {
            return {
                fleetId: location.fleetId,
                driverId: location.driverId,
                location: {
                    lat: parseFloat(location.location.lat),
                    lon: parseFloat(location.location.lon),
                },
                timestamp: new Date(location.timestamp),
            };
        });

        console.log(fleetLocations);
        return fleetLocations;
    } catch (error) {
        throw new Error(`Error fetching location data: ${error.message}`);
    }
}

export { getLocationData };
