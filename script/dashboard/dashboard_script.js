document.addEventListener("DOMContentLoaded", function () {
    if (!isAuthenticated()) {
        window.location.href = "index.html";
    }

    // Assuming you have a logout link with id "logout-link"
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", function () {
            console.log("Logout link clicked");  // Add this line for debugging
            // Clear tokens from local storage on logout
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // Redirect to the login page after logout
            window.location.href = "index.html";
        });
    }

});

function isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return token !== null && token !== "";
}
