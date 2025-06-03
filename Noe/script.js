const backupProductos = [
    {
        "id": 1,
        "nombre": "The Legend of Zelda: Tears of the Kingdom",
        "tipo": "juego-digital",
        "plataforma": "Nintendo Switch",
        "precio": 59.99,
        "imagen": "zelda.jpg"
    },
    {
        "id": 2,
        "nombre": "God of War: Ragnarök",
        "tipo": "juego-digital",
        "plataforma": "PlayStation 5",
        "precio": 69.99,
        "imagen": "gow.jpg"
    },
    {
        "id": 3,
        "nombre": "Halo Infinite",
        "tipo": "juego-digital",
        "plataforma": "Xbox Series X|S",
        "precio": 49.99,
        "imagen": "halo.jpg"
    },
    {
        "id": 4,
        "nombre": "Cyberpunk 2077: Phantom Liberty",
        "tipo": "juego-digital",
        "plataforma": "PC",
        "precio": 39.99,
        "imagen": "cyberpunk.jpg"
    },
    {
        "id": 5,
        "nombre": "FIFA 23",
        "tipo": "juego-digital",
        "plataforma": "Multiplataforma",
        "precio": 29.99,
        "imagen": "fifa23.jpg"
    },
    {
        "id": 6,
        "nombre": "PlayStation 5 - Edición Digital",
        "tipo": "consola",
        "plataforma": "Sony",
        "precio": 449.99,
        "imagen": "ps5-digital.jpg"
    },
    {
        "id": 7,
        "nombre": "Xbox Series X",
        "tipo": "consola",
        "plataforma": "Microsoft",
        "precio": 499.99,
        "imagen": "xbox-series-x.jpg"
    },
    {
        "id": 8,
        "nombre": "Nintendo Switch OLED",
        "tipo": "consola",
        "plataforma": "Nintendo",
        "precio": 349.99,
        "imagen": "switch-oled.jpg"
    },
    {
        "id": 9,
        "nombre": "Mando DualSense - Rojo",
        "tipo": "periferico",
        "plataforma": "PlayStation 5",
        "precio": 69.99,
        "imagen": "dualsense-rojo.jpg"
    },
    {
        "id": 10,
        "nombre": "Auriculares SteelSeries Arctis 7",
        "tipo": "periferico",
        "plataforma": "Multiplataforma",
        "precio": 149.99,
        "imagen": "arctis7.jpg"
    }
]

let todosLosProductos = [];

// ------------ ESCUCHADORES ------------
document.addEventListener('DOMContentLoaded', function() {
    inicializar();
    
    //  LLAMAR A MOSTRAR PRODUCTOS AL CLICKEAR BOTON "VER PRODUCTOS"
    const botonMostrar = document.querySelector('.btn-productos')
    botonMostrar.addEventListener('click', function() {
        mostrarProductos(todosLosProductos);
    });
    // console.log('clickie mostrar');
})

// --------------------------------------

//  ------------ ACA VA TODO LO QUE SE NECESITA PARA INICIALIZAR LA PAG
function inicializar() {
    traerProductos()
    .then (productos => {
        todosLosProductos = productos; 
    })
    .catch(error => console.error('Error al inicializar', error));
}

//  ------------ CARGO LOS PRODUCTOS DESDE EL JSON
function traerProductos(){
    return fetch ('productos.json')
    .then(response => {
        if (!response.ok){
            throw new Error ('Error en la respuesta: ' + response.status);
        }
        return response.json();
    })
    .then (data => data.productos || backupProductos)
    .catch(error => {
        console.error('Error cargando los datos: ', error);
        return backupProductos;
    })
}

// ------------  MUESTRO PRODUCTOS DINAMICAMENTE - CREANDO UN CONTENEDOR PARA C/U
function mostrarProductos (productos){
    const containerProductos = document.querySelector('.container-productos');

    containerProductos.innerHTML = '<h2 class="mb-4">Catálogo de productos</h2>';
    const row = document.createElement('div');
    row.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4';

    productos.forEach(producto => {
        row.innerHTML += `
            <div class="col">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">
                        <strong>Plataforma:</strong> ${producto.plataforma}<br>
                        <strong>Tipo:</strong> ${producto.tipo}<br>
                        <strong>Precio:</strong> $${producto.precio}
                    </p>
                </div>
            </div>
        `
    });
    containerProductos.appendChild(row);
}

