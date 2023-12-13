// getEmployees.js
console.log('getEmployees.js is loaded');

function getEmployeesData(accessToken) {
  const config = {
    headers: {
      'authorization': `bearer ${accessToken}`,
    },
  };

  return axios.get('https://34.101.109.44:3001/v1/users', config)
    .then(response => {
      const data = response.data.users;
      console.log('Fetched employee data:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching employee data:', error);
      return [];
    });
}

export default getEmployeesData;
