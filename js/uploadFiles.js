document.addEventListener('DOMContentLoaded', main);

function main() {
    const form = document.getElementById('upload-files-form');
    form.addEventListener('submit', handleSubmitFile);
}

async function handleSubmitFile(e) {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const privateInputRadio = document.getElementById('private-inputRadio');
    const publicInputRadio = document.getElementById('public-inputRadio');


    if (fileInput.files.length === 0) {
        alert('*alert simulator je* Selecciona una imagen');
        return;
    }


    if (!privateInputRadio.checked && !publicInputRadio.checked) {
        alert('*alert simulator je* Selecciona al menos un tipo');
        return;
    }

    const token = JSON.parse(localStorage.getItem('jwt'));
    if (!token) return

    const selectedFile = fileInput.files[0];

    if (!selectedFile.type.startsWith('image/')) {
        alert('*alert simulator jeje* El archivo seleccionado no es una imagen.');
        return;
    }

    const fileSizeInMB = selectedFile.size / (1024 * 1024);
    if (fileSizeInMB > 6) {
        alert('*alert simulator jeje* El archivo es demasiado grande (máximo 6 MB).');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    privateInputRadio.checked ? postPrivateImg(formData, token) : postPublicImg(formData, token);
}

async function postPrivateImg(file, token) {
    const PRIVATE_FILES_ENDPOINT = 'https://sem20-2-dev-zgcj.4.us-1.fl0.io/file/private-file'
    const options = {
        method: 'POST',
        headers: {
            'authorization': token,
        },
        body: file,
    };
    showSpinner()
    const res = await fetch(PRIVATE_FILES_ENDPOINT, options);
    if (!res.ok) {
        alert('*alert simulator jeje* algo salió mal subiendo la imagen')
        hideSpinner()
        return;
    }
    await res.json();
    hideSpinner()
    alert('*alert simulator* todo salio gud')
}

async function postPublicImg(file, token) {
    const PUBLIC_FILES_ENDPOINT = 'https://sem20-2-dev-zgcj.4.us-1.fl0.io/file/public-file'
    const options = {
        method: 'POST',
        headers: {
            'authorization': token,
        },
        body: file,
    };
    showSpinner()
    const res = await fetch(PUBLIC_FILES_ENDPOINT, options);
    if (!res.ok) {
        alert('*alert simulator jeje* algo salió mal subiendo la imagen')
        hideSpinner()
        return;
    }
    await res.json();
    hideSpinner()
    alert('*alert simulator* todo salio gud')
}

function showSpinner() {
    const contentContainer = document.getElementById('content-container');
    const spinner = document.getElementById('spinner');

    contentContainer.classList.add('d-none')
    spinner.classList.remove('d-none')
}

function hideSpinner() {
    const contentContainer = document.getElementById('content-container');
    const spinner = document.getElementById('spinner');

    contentContainer.classList.remove('d-none')
    spinner.classList.add('d-none')
}