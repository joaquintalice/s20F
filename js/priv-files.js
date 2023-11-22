document.addEventListener('DOMContentLoaded', main);

function main() {
    imgContainerInnerHTML();
}

async function getPrivateImages() {
    const token = JSON.parse(localStorage.getItem('jwt'));

    const PRIVATE_FILES_ENDPOINT = 'https://sem20-2-dev-zgcj.4.us-1.fl0.io/file/serve-private-files'
    const options = {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    }

    const res = await fetch(PRIVATE_FILES_ENDPOINT, options);
    if (!res.ok) throw new Error('No se pudieron obtener los paths de las imágenes.');
    const data = await res.json();
    return data.paths.sort((a, b) => b.localeCompare(a))
}

async function imgContainerInnerHTML() {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = showSpinner()
    const data = await getPrivateImages()
    imageContainer.innerHTML = hideSpinner()
    const template = data.length >= 1 ? imagesHTMLTemplate(data) : alertMsgTemplate()
    imageContainer.innerHTML = template
}

function alertMsgTemplate() {
    return `<h2 class="text-light text-center ">Aún no hay contenido</h2>`
}

function imagesHTMLTemplate(paths) {
    return paths.map(path => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="img__container">
                <img class="img-fluid shadow" src="${path}" alt="Imagen">
            </div>
        </div>
    `).join('');
}


function showSpinner() {
    return `
    <div class="d-flex justify-content-center">
        <div class="orbit-spinner">
            <div class="orbit"></div>
            <div class="orbit"></div>
            <div class="orbit"></div>
        </div>
    </div>
    `
}

function hideSpinner() {
    return ``
}