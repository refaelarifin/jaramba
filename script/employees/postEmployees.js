// postEmployees.js

// // Function to add a new employee to the server
// async function postNewEmployee(newEmployee, accessToken) {
//     const config = {
//         headers: {
//             'authorization': `bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//         },
//     };

//     try {
//         const response = await axios.post('http://34.101.109.44:3000/v1/users', newEmployee, config);
//         const postedEmployee = response.data; // Adjust this based on your server response

//         // Call a function to add the new employee to the table
//         addNewEmployeeToTable(postedEmployee);

//         console.log('New employee added successfully:', postedEmployee);
//     } catch (error) {
//         console.error('Error adding new employee:', error);
//         // Handle the error, e.g., display an error message to the user
//         const errorMessage = 'Failed to add a new employee. Please try again later.';
//         alert(errorMessage);
//     }
// }

