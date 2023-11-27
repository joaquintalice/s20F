document.addEventListener('DOMContentLoaded', main);

function main() {
    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', handleSignin);
    termsAndPols();
}

async function handleSignin(e) {
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

    try {
        const loggedUser = await signin(emailInput.value, passwordInput.value);
        if (!loggedUser) {
            showAlert('clearInputs', '')
            return showModal({ title: 'Error', description: 'Hubo un error en el inicio de sesión. Inténtalo de nuevo' });
        }
        showAlert('clearInputs', '')
        location.href = 'index.html';
        hideSpinner();
    } catch (error) {
        showAlert('Error', 'Hubo un error en el inicio de sesión. Inténtalo de nuevo');
    }
}

async function signin(email, password) {
    const SIGNIN_ENDPOINT = 'https://sem20-2-dev-zgcj.4.us-1.fl0.io/auth/signin';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }
    showSpinner();
    const res = await fetch(SIGNIN_ENDPOINT, options);
    if (!res.ok) {
        hideSpinner();
        return;
    };
    const data = await res.json();

    const { id } = data.data;
    const { token } = data;

    localStorage.setItem('jwt', JSON.stringify(token));
    localStorage.setItem('currentUserID', JSON.stringify(id));
    return data;
}


function termsAndPols() {
    const terms = document.getElementById('terms');
    const pols = document.getElementById('pols');

    terms.addEventListener('click', () => {
        showModal({ title: 'Términos de uso', description: 'No subir cosas raras.' });
    })
    pols.addEventListener('click', () => {
        showModal({ title: 'Políticas de privacidad', description: 'lorem ipsum...' });
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
    const signinForm = document.getElementById('signin-form');
    const spinner = document.getElementById('spinner');

    signinForm.classList.add('d-none')
    spinner.classList.remove('d-none')
}

function hideSpinner() {
    const signinForm = document.getElementById('signin-form');
    const spinner = document.getElementById('spinner');

    signinForm.classList.remove('d-none')
    spinner.classList.add('d-none')
}