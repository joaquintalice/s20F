document.addEventListener('DOMContentLoaded', main);

function main() {
    handleSubmit()
}

function handleSubmit() {
    const form = document.getElementById('imgForm');
    const fileInput = document.getElementById('fileInput');
    const submitInput = document.getElementById('submitInput');

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(fileInput.value)
    })
}

// Obtener todas las cookies como una cadena
const todasLasCookies = document.cookie;

// Dividir la cadena de cookies en pares clave-valor
const cookiesDivididas = todasLasCookies.split(';');

// Crear un objeto para almacenar las cookies
const cookies = {};

// Iterar sobre los pares clave-valor y agregarlos al objeto de cookies
cookiesDivididas.forEach(cookie => {
    const [nombre, valor] = cookie.trim().split('=');
    cookies[nombre] = valor;
});

// Ahora, el objeto `cookies` contiene todas las cookies en pares clave-valor
console.log(cookies);

// Acceder a una cookie específica por su nombre
const valorDeLaCookie = cookies.nombreDeLaCookie;
console.log(valorDeLaCookie);


// Supongamos que tienes un elemento en tu HTML con el id "imageContainer"
const imageContainer = document.getElementById('imageContainer');

// Hacer una solicitud fetch para obtener la lista de paths de imágenes
fetch('https://sem20-2-dev-zgcj.4.us-1.fl0.io/file/serve-public-files')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los paths de las imágenes.');
        }
        return response.json();
    })
    .then(data => {
        // Crear elementos de imagen para cada path
        const imageElements = data.paths.map(path => {
            const img = document.createElement('img');
            img.src = `http://localhost:3005${path}`;
            img.alt = 'Imagen';
            return img;
        });

        // Agregar los elementos de imagen al contenedor en tu HTML
        imageElements.forEach(img => {
            imageContainer.appendChild(img);
        });
    })
    .catch(error => {
        console.error('Error al obtener los paths de las imágenes:', error.message);
    });
