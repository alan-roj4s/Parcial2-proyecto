import { agregarAlCarrito } from "./carrito.js";

let todosLosProductos = [];

export async function inicializarProductos() {
    try {
        todosLosProductos = await cargarProductos();
        configurarFiltros();
        filtrarProductos('todos');
    }catch (error) {
        console.error('Error inicializando productos: ', error);
    }
}

//  ------------ CARGO LOS PRODUCTOS 
async function cargarProductos(){
    try {
        const response = await fetch('http://localhost:3000/api/products');

        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error cargando los datos: ', error);
        return []; // ARRAY VACIO EN CASO DE ERROR
    }
}

function configurarFiltros() {
    const filterButton = document.querySelectorAll('[data-categoria]');
    // Conectar los botones de categoría al filtro
    filterButton.forEach(btn => {
        btn.addEventListener('click', function() {
        // Cambiar estilos de botones activos
        filterButton.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filtrar productos según la categoría seleccionada
        filtrarProductos(this.dataset.categoria);
        });
    });
    console.log('Contenido cargado con exito');
}

// ------------- FILTRADO DE PRODUCTOS
function filtrarProductos (categoria){ 
    const gamesContainer = document.getElementById('juego-digital-category')
    const consolesContainer = document.getElementById('dispositivo-category')

    gamesContainer.innerHTML = '';
    consolesContainer.innerHTML = '';

    const productosFiltrados = categoria === 'todos' ? todosLosProductos : todosLosProductos.filter(producto => producto.categoria.toLowerCase() === categoria);

    productosFiltrados.forEach(producto => {
        const card = crearCardProducto(producto);
        if (producto.categoria.toLowerCase() === 'juego-digital') {
            gamesContainer.appendChild(card);
        } else if (producto.categoria.toLowerCase() === 'dispositivo') {
            consolesContainer.appendChild(card);
        }
    })
    // AGREGAR UN PARRAFO EN EL CASO DE QUE NO HAYA PRODUCTOS
    // if (productosFiltrados.length === 0) {
    //     const mensaje = document.createElement('p');
    //     mensaje.textContent = 'No hay productos disponibles en esta categoría.';
    //     mensaje.className = 'text-center text-muted';
    //     gamesContainer.appendChild(mensaje);
    // }
}


// -------------- CREA LA CARTA QUE MUESTRA EN PANTALLA
function crearCardProducto(producto) { 
    // VALIDAMO SI ES TIPO OJETO
    if (!producto || typeof producto !== 'object'){
        console.error('Producto invalido:', producto);
        return document.createDocumentFragment();
    }

    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';

    const productoData = {
        id: producto.id,
        nombre: producto.nombre,
        categoria: producto.categoria,
        plataforma: producto.plataforma,
        precio: parseFloat(producto.precio),
        imagen: `/Imagenes/${producto.imagen}`
    }
    //aria-label="Agregar ${productoData.nombre} al carrito">
    //<i class="fas fa-cart-plus me-2"></i>Agregar
    col.innerHTML = `
        <div class="card product-card shadow-sm h-100">
            <img src="${productoData.imagen}" class="card-img-top" alt="${productoData.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${productoData.nombre}</h5>
                <span class="badge bg-secundary mb-2">${productoData.plataforma}</span> 
                <div class="mt-auto">
                    <p class="mb-2 fw-bold text-primary fs-5">Precio: $${productoData.precio}</p>
                    <button class="btn btn-primary add-to-cart w-100" data-producto-id="${productoData.id}">
                        <i class="fas fa-cart-plus"></i>Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `
    //captura señal del boton
    const botonAgregar = col.querySelector('.add-to-cart')

    //  evento que añade al carrito
    botonAgregar.addEventListener('click', () => {
        // e.preventDefault();
        console.log('agregue producto');
        agregarAlCarrito(productoData);
    });
    return col;
}
