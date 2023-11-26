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

    if ((!emailInput.value && !passwordInput.value) ||
        (!emailInput.value || !passwordInput.value)) return showModal('Campos inválidos.', 'Ninguno de los dos campos debe estar vacío.')
    if (!validateEmail(emailInput.value)) return showModal('Campos inválidos.', 'Ingresa un email válido.')

    const newUser = await signupUser(emailInput.value, passwordInput.value);
    if (!newUser) return;
    showModal('Registro exitoso.', 'Te registraste con éxito. Redirigiendo...')
    setTimeout(() => {
        location.href = 'signin.html'
    }, 1500);
}

async function signupUser(email, password) {
    // const SIGNUP_ENDPOINT = 'https://sem20-2-dev-zgcj.4.us-1.fl0.io/auth/signup'
    const SIGNUP_ENDPOINT = 'http://localhost:3005/auth/signup'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }

    const res = await fetch(SIGNUP_ENDPOINT, options);
    console.log(res)
    if (res.status === 409) return showModal('Error.', 'Ya existe un usuario con este correo.')
    if (!res.ok) return showModal('Error.', 'Hubo algún error en el registro')
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