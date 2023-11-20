document.addEventListener('DOMContentLoaded', main);

function main() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', handleSignup)
}

async function handleSignup(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (!emailInput.value && !passwordInput.value) return alert('*simulador de alerta*Poné algo crack');
    if (!emailInput.value || !passwordInput.value) return alert('*simulador de alerta*Te faltó algún campo jeje')
    if (!validateEmail(emailInput.value)) return alert('*simulador de alerta*Ingresa un email válido')

    const newUser = await signupUser(emailInput.value, passwordInput.value);
    if (!newUser) return alert('*simulador de alerta* Hubo algún error en el registro')
    alert('*simulador de alerta* Te registraste con éxito')
}

async function signupUser(email, password) {
    const SIGNUP_ENDPOINT = 'https://sem20-2-dev-zgcj.4.us-1.fl0.io/auth/signup'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }

    const res = await fetch(SIGNUP_ENDPOINT, options);
    if (!res.ok) return
    const data = await res.json();
    location.href = 'signin.html'
    return data
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};