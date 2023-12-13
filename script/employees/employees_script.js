// employees_script.js
import getEmployeesData from './getEmployees.js';

// Function to get the access token from localStorage
function getAccessToken() {
    return localStorage.getItem('accessToken');
}

function addEmployeesToTable(employees) {
    const table = document.getElementById('employees_table');

    // Clear existing rows in the table
    table.innerHTML = '';

    if (employees.length === 0) {
        // Handle case when no data is available
        const noDataMessage = 'No employee data available.';
        const row = table.insertRow();
        const noDataCell = row.insertCell(0);
        noDataCell.colSpan = 5; // Span across all columns
        noDataCell.textContent = noDataMessage;
    } else {
        // Add header row
        const headerRow = table.insertRow();

        ['Name', 'Position', 'Phone Number', 'Status', 'Details'].forEach((headerText, index) => {
            const headerCell = headerRow.insertCell();
            headerCell.textContent = headerText;

            // Apply styles to header cells
            headerCell.classList.add('header-cell'); // You can define 'header-cell' class in your CSS
        });

        // Add data rows
        employees.forEach(employee => {
            const row = table.insertRow();

            const nameCell = row.insertCell();
            const positionCell = row.insertCell();
            const phoneNumberCell = row.insertCell();
            const statusCell = row.insertCell();
            const detailsCell = row.insertCell();

            nameCell.textContent = employee.name;
            positionCell.textContent = employee.roles.join(', '); // Display roles as a comma-separated string
            phoneNumberCell.textContent = employee.email;
            // Set color based on the 'Active' or 'Inactive' status
            if (employee.active) {
                statusCell.innerHTML = '<b style="color: green;">Active</b>'; // Set bold and green for 'Active'
            } else {
                statusCell.innerHTML = '<b style="color: red;">Inactive</b>'; // Set bold and red for 'Inactive'
            }

            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'Details';
            detailsButton.addEventListener('click', () => showDetails(employee));
            detailsCell.appendChild(detailsButton);
        });
    }
}

// Function to show details (customize this function as needed)
function showDetails(employee) {
    console.log('Details for employee:', employee);
    // Implement your details functionality here
    // You may show a modal or navigate to a new page with more details
}

// Fetch employees data and update the table on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Get the access token dynamically
        const accessToken = getAccessToken();

        if (!accessToken) {
            // Handle the case when the access token is not available
            console.error('Access token not found. Please log in.');
            return;
        }

        const employeesData = await getEmployeesData(accessToken);
        addEmployeesToTable(employeesData);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        // Handle the error, e.g., display an error message to the user
        const errorMessage = 'Failed to fetch employee data. Please try again later.';
        alert(errorMessage);
    }
});
