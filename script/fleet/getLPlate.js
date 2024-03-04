// import axios from 'axios';

async function getFleetData(accessToken) {
    try {
        const response = await axios.get('http://34.125.67.146:3000/v1/fleets', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${accessToken}`, // Use the dynamically retrieved access token
            },
        });

        const fleetData = response.data.fleets;

        return fleetData;
    } catch (error) {
        throw new Error(`Error fetching fleet data: ${error.message}`);
    }
}

export { getFleetData };