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

    if (
        (!emailInput.value && !passwordInput.value) ||
        (!emailInput.value || !passwordInput.value)) return showModal('Campos inválidos.', 'Ninguno de los dos campos debe estar vacío.');

    if (!validateEmail(emailInput.value)) return showModal('Campos inválidos.', 'Ingresa un email válido.');
    const loggedUser = await signin(emailInput.value, passwordInput.value);
    if (!loggedUser) return showModal('Error', 'Hubo un error en el inicio de sesión. Inténtalo de nuevo');
    showModal('Inicio de sesión exitoso.', 'Iniciaste sesión con éxito. Redirigiendo...');
    setTimeout(() => {
        location.href = 'index.html';
    }, 1500);
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

    const res = await fetch(SIGNIN_ENDPOINT, options);
    if (!res.ok) return;
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
        showModal('Términos de uso', 'No subir cosas raras.');
    })
    pols.addEventListener('click', () => {
        showModal('Políticas de privacidad', 'lorem ipsum...');
    })
}

function showModal(title, description) {
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