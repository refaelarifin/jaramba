function redirectToDashboard() {
    var identifier = document.getElementById("identifier").value;
    var password = document.getElementById("password").value;

    axios.post('http://34.125.67.146:3000/v1/login', {
        usernameOrEmail: identifier,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => { 
        const data = response.data;
        if (data.accessToken && data.refreshToken) {
            // Tokens are present, store them in local storage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // Set the access token in the default headers for future requests
            axios.defaults.headers.common['authorization'] = `bearer ${data.accessToken}`;

            // Redirect to the dashboard.html page
            window.location.href = "dashboard.html";
        } else {
            // Invalid response format, handle accordingly
            alert("Unexpected response from the server. Please try again later.");
        }
    })
    .catch(error => {
        if (error.response && error.response.status === 401) {
            // Handle 401 status code (Unauthorized)
            alert("Invalid username or password. Please try again.");
        } else {
            // Handle other errors during the Axios request
            console.error('Error during Axios request:', error);
        }
    });

    return false;
}
