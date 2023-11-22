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

    // Validar que haya una imagen seleccionada
    if (fileInput.files.length === 0) {
        alert('*alert simulator je* Selecciona una imagen');
        return;
    }

    // Validar que al menos uno de los inputRadio esté seleccionado
    if (!privateInputRadio.checked && !publicInputRadio.checked) {
        alert('*alert simulator je* Selecciona al menos un tipo');
        return;
    }

    // Obtener los valores seleccionados
    const selectedFile = fileInput.files[0];
    const endpointURL = privateInputRadio.checked ? 'http://localhost:3005/file/private-file' : 'http://localhost:3005/file/public-file';

    const token = JSON.parse(localStorage.getItem('jwt'));
    if (!token) return

    const formData = new FormData();
    formData.append('file', selectedFile);

    const options = {
        method: 'POST',
        headers: {
            'authorization': token,
        },
        body: formData,
    };

    const res = await fetch(endpointURL, options);
    const data = await res.json();

    if (!res.ok) return alert('*alert simulator jeje* algo salió mal subiendo la imagen')
    alert('*alert simulator* todo salio gud')

}