document.addEventListener('DOMContentLoaded', main);

function main() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', handleSignup)
    termsAndPols()
}

async function handleSignup(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    if ((!emailInput.value && !passwordInput.value)) {
        return showAlert('both', 'Ambos campos deben estar llenos.');
    }

    if (!emailInput.value) {
        return showAlert('email', 'Debes ingresar un email.')
    }

    if (!passwordInput.value) {
        return showAlert('password', 'Debes ingresar una contraseña.')
    }

    if (!validateEmail(emailInput.value)) {
        return showAlert('email', 'Ingresa un email válido.');
    }

    const newUser = await signupUser(emailInput.value, passwordInput.value);
    if (!newUser) return;
    showModal({ title: 'Registro exitoso.', description: 'Te registraste con éxito. Redirigiendo...' })
    setTimeout(() => {
        location.href = 'signin.html'
    }, 300);
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
    showSpinner()
    const res = await fetch(SIGNUP_ENDPOINT, options);
    if (res.status === 409) {
        showModal({ title: 'Error.', description: 'Ya existe un usuario con este correo.' });
        hideSpinner();
        return;
    }
    if (!res.ok) {
        showModal('Error.', 'Hubo algún error en el registro')
        hideSpinner();
        return;
    }
    const data = await res.json();
    return data
}

function termsAndPols() {
    const terms = document.getElementById('terms')
    const pols = document.getElementById('pols')

    terms.addEventListener('click', () => {
        showModal('Términos de uso', 'No subir cosas raras.')
    })
    pols.addEventListener('click', () => {
        showModal('Políticas de privacidad', 'lorem ipsum...')
    })

}

function showAlert(target, description) {
    const emailAlert = document.getElementById('emailAlert');
    const pwAlert = document.getElementById('passwordAlert');

    emailAlert.textContent = '';
    pwAlert.textContent = '';

    emailAlert.classList.remove('d-block');
    pwAlert.classList.remove('d-block');

    if (target === 'both') {
        emailAlert.textContent = description;
        pwAlert.textContent = description;
        emailAlert.classList.add('d-block');
        pwAlert.classList.add('d-block');
    } else if (target === 'email') {
        emailAlert.textContent = description;
        emailAlert.classList.add('d-block');
    } else if (target === 'clearInputs') {
        emailAlert.classList.remove('d-block');
        pwAlert.classList.remove('d-block');
        emailAlert.classList.add('d-none');
        pwAlert.classList.add('d-none');
    } else {
        pwAlert.textContent = description;
        pwAlert.classList.add('d-block');
    }
}


function showModal({ title, description }) {
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));

    modalTitle.textContent = title;
    modalDescription.textContent = description;

    alertModal.show();
}


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


function showSpinner() {
    const signupForm = document.getElementById('signup-form');
    const spinner = document.getElementById('spinner');

    signupForm.classList.add('d-none')
    spinner.classList.remove('d-none')
}

function hideSpinner() {
    const signupForm = document.getElementById('signup-form');
    const spinner = document.getElementById('spinner');

    signupForm.classList.remove('d-none')
    spinner.classList.add('d-none')
}