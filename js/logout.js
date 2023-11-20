document.addEventListener('DOMContentLoaded', main);

function main() {
    checkIfLogged()
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', logout)
}

function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUserID');
    location.href = 'signin.html'
}

function checkIfLogged() {
    const token = JSON.parse(localStorage.getItem('jwt'))
    const userID = JSON.parse(localStorage.getItem('currentUserID'))

    if (!token || !userID) {
        location.href = 'signin.html'
    }
}