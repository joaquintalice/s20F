document.addEventListener('DOMContentLoaded', main);

function main() {
    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', handleSignin)
}

async function handleSignin(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (!emailInput.value && !passwordInput.value) return alert('*simulador de alerta*Poné algo crack');
    if (!emailInput.value || !passwordInput.value) return alert('*simulador de alerta*Te faltó algún campo jeje')
    if (!validateEmail(emailInput.value)) return alert('*simulador de alerta*Ingresa un email válido')

    const loggedUser = await signin(emailInput.value, passwordInput.value);
    if (!loggedUser) return alert('*simulador de alerta* Hubo algún error en el login')
    alert('*simulador de alerta* Iniciaste sesión con éxito')
}

async function signin(email, password) {
    const SIGNIN_ENDPOINT = 'http://localhost:3005/auth/signin'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }

    const res = await fetch(SIGNIN_ENDPOINT, options);
    if (!res.ok) return
    const data = await res.json();

    const { id } = data.data
    const { token } = data

    localStorage.setItem('jwt', JSON.stringify(token));
    localStorage.setItem('currentUserID', JSON.stringify(id))
    location.href = 'index.html'
    return data
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};