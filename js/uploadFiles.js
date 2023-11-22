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
    const formData = new FormData();
    formData.append('file', selectedFile);

    privateInputRadio.checked ? postPrivateImg(formData, token) : postPublicImg(formData, token);
}

async function postPrivateImg(file, token) {
    const PRIVATE_FILES_ENDPOINT = 'http://localhost:3005/file/private-file'
    const options = {
        method: 'POST',
        headers: {
            'authorization': token,
        },
        body: file,
    };

    const res = await fetch(PRIVATE_FILES_ENDPOINT, options);
    if (!res.ok) return alert('*alert simulator jeje* algo salió mal subiendo la imagen')
    const data = await res.json();
    console.log(data)
    alert('*alert simulator* todo salio gud')
}

async function postPublicImg(file, token) {
    const PUBLIC_FILES_ENDPOINT = 'http://localhost:3005/file/public-file'
    const options = {
        method: 'POST',
        headers: {
            'authorization': token,
        },
        body: file,
    };

    const res = await fetch(PUBLIC_FILES_ENDPOINT, options);
    if (!res.ok) return alert('*alert simulator jeje* algo salió mal subiendo la imagen')
    const data = await res.json();
    console.log(data)
    alert('*alert simulator* todo salio gud')
}