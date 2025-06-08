// import script from "./script.js"

let todosLosProductos = [];


export function filtrarProductos (categoria){
    const gamesContainer = document.getElementById('gamesContainer')
    const consolesContainer = document.getElementById('consolesContainer')

    gamesContainer.innerHTML = '';
    consolesContainer.innerHTML = '';

    const productosFiltrados = categoria === 'todos' ? todosLosProductos : todosLosProductos.filter(producto => producto.tipo.toLowerCase() === categoria);

    productosFiltrados.forEach(producto => {
        const card = crearCardProducto(producto);
        if (producto.tipo.toLowerCase() === 'juego') {
            gamesContainer.appendChild(card);
        } else if (producto.tipo.toLowerCase() === 'consola') {
            consolesContainer.appendChild(card);
        }
    })
}

export function crearCardProducto(producto) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
        <div class="card h-100">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">
                    <strong>Plataforma:</strong> ${producto.plataforma}<br>
                    <strong>Tipo:</strong> ${producto.tipo}<br>
                    <strong>Precio:</strong> $${producto.precio}
                </p>
                <button class="btn btn-primary">Agregar al carrito</button>
            </div>
        </div>
    `
    return col;
}