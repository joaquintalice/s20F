document.addEventListener('DOMContentLoaded', main);

function main() {
    getAllImages();
}


async function getAllImages() {
    const token = JSON.parse(localStorage.getItem('jwt'));
    const imageContainer = document.getElementById('imageContainer');

    fetch('https://sem20-2-dev-zgcj.4.us-1.fl0.io/file/serve-private-files', {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) throw new Error('No se pudieron obtener los paths de las imágenes.');
            return response.json();
        })
        .then(data => {
            console.log(data.paths)
            if (data.paths.length > 0) {
                const imagesHTML = generateImagesHTML(data.paths);
                imageContainer.innerHTML = '';
                imageContainer.innerHTML = imagesHTML;
                return;
            }
            const imagesHTML = `<h2 class="text-light text-center ">Aún no hay contenido</h2>`
            imageContainer.innerHTML = '';
            imageContainer.innerHTML = imagesHTML;
        })
        .catch(error => {
            console.error('Error al obtener los paths de las imágenes:', error.message);
        });
}


function generateImagesHTML(paths) {
    const HOST_SV = 'https://sem20-2-dev-zgcj.4.us-1.fl0.io';
    const columnsHTML = paths.map(path => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="img__container">
                <img class="img-fluid shadow" src="${HOST_SV}${path}" alt="Imagen">
            </div>
        </div>
    `).join('');

    return `<div class="row gx-4 gy-4 my-5">${columnsHTML}</div>`;
}
