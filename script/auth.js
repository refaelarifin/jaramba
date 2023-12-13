// auth.js
document.addEventListener("DOMContentLoaded", function () {
    if (!isAuthenticated()) {
        window.location.href = "index.html";
    }

    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", function () {
            clearTokensAndRedirect();
        });
    }
});

function isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return token !== null && token !== "";
}

function getAccessToken() {
    return localStorage.getItem('accessToken');
}

function clearTokensAndRedirect() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = "index.html";
}
