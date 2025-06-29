// ARRAYS
let todosLosProductos = [];
let carrito = [];


// ------------------- LISTENERS / ESCUCHADORES 

document.addEventListener('DOMContentLoaded', async function() {
    try {
        todosLosProductos = await traerProductos();

        // RENDERIZAMOS TODOS INCIALMENTE
        filtrarProductos('todos')

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
    } catch(error){
        console.log('Error al inicializar', error);
    }
    
    //SAQUE EL CODIGO PARA REDIRECCIONAR DE PAGINA YA QUE LO HACE EL EJS CON EL SERVER
});

// --------------------------------------


//  ------------ CARGO LOS PRODUCTOS DESDE EL JSON
// MODIFIQUE EL METODO DE CARGA CON AYSNC Y AWAIT - SACAMOS EL BUCKUP
async function traerProductos(){
    try {
        const response = await fetch('../Scripts/productos.json');
        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        const data = await response.json();
        return data.productos;
    } catch (error) {
        console.error('Error cargando los datos: ', error);
        return []; // ARRAY VACIO EN CASO DE ERROR
    }
}

// -- FILTRADO DE PRODUCTOS

function filtrarProductos (categoria){   // export removido
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
    // HABRIA QUE AGREGAR UN PARRAFO EN EL CASO DE QUE NO HAYA PRODUCTOS
}


// -------------- CREA LA CARTA QUE MUESTRA EN PANTALLA
function crearCardProducto(producto) {    // export removido
    // HAY QUE MODIFICAR CIERTAS CREACIONES DE CARD PARA QUE NO PISE EL DISEÑO QUE YA ESTABA
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
    col.innerHTML = `
        <div class="card product-card shadow-sm h-100">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${producto.nombre}</h5>
                <span class="badge bg-secundary mb-2">${producto.plataforma}</span> 
                <div class="mt-auto">
                    <p class="mb-2 fw-bold text-primary fs-5">Precio: $${producto.precio}</p>
                    <button class="btn btn-primary add-to-cart w-100" data-producto-id="${producto.id}">
                        <i class="fas fa-cart-plus"></i>Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `
    //captura señal del boton
    const botonAgregarCarro = col.querySelector('.add-to-cart')

    //  evento que añade al carrito
    botonAgregarCarro.addEventListener('click', () => {
        // e.preventDefault();
        agregarAlCarrito(producto);
    });
                     //<strong>Tipo:</strong> ${producto.categoria}<br></br> 
    return col;
}

// -------------- funciones del carrito


// Agrega producto al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
  console.log("producto agregado");
  
}

function calcularTotal() {    
    return carrito.reduce((total, item) => {
        const precio = parseFloat(item.precio);
        const cantidad = parseInt(item.cantidad, 10) || 1;
        return total + (precio * cantidad);
    }, 0).toFixed(2);
}
// Actualiza la vista del carrito
function actualizarCarrito() {
    const contenedor = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");
    // const contador = document.getElementById("cart-count");

    contenedor.innerHTML = ""; // limpiar y actualizar

    const sumaTotal = calcularTotal();

    carrito.forEach((item, index) => {
        const precio = parseFloat(item.precio);
        const cantidad = parseInt(item.cantidad, 10) || 1;

        const div = document.createElement("div");
        div.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center", "mb-2", "p-2");

        div.innerHTML = `
            <div class="item-info"> 
                <p class="item-name mb-0 text-white">${item.nombre}</p>
                <small class="text-muted">${precio.toFixed(2)} x ${cantidad}</small>
            </div>
            
            <button class="delete-button"><i class="fas fa-trash"></i></button>
        `;

        div.querySelector(".delete-button").addEventListener("click", () => {
        eliminarDelCarrito(index);
        });

        contenedor.appendChild(div);
        
    console.log("carro actualizado");
    
    });

    total.textContent = sumaTotal;
    // contador.textContent = carrito.length;
}

// Elimina producto del carrito
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
  console.log("producto eliminado");
  
}

// ----------------------------------

// FORMULARIO PARA TOMAR LOS DATOS DE LA COMPRA Y MOSTRARLOS EN EL TICKET
document.getElementById('checkoutForm').addEventListener('submit', (event) => {
    const formUserName = document.getElementById('formUserName');
    const formCartItems = document.getElementById('formCartItems');
    const formCartTotal = document.getElementById('formCartTotal');

    const userName = obtenerNombreUsuario(); // Lo vamos a crear abajo

    formUserName.value = userName;
    formCartItems.value = JSON.stringify(carrito); // serializa el array
    formCartTotal.value = calcularTotal();

    // El formulario se enviará normalmente después de esto
});



// Esta función busca el userName que está renderizado en productos.ejs
function obtenerNombreUsuario() {
    const span = document.querySelector('span.fw-bold.text-primary');
    return span ? span.textContent.trim() : 'Invitado';
}




// function actualizarInputCarrito() {
//     const inputCarrito = document.getElementById('cartItemsInput');
//     if (carrito.length === 0) {
//         inputCarrito.value = "[]"; // Siempre un JSON válido
//     } else {
//         inputCarrito.value = JSON.stringify(carrito);
//     }
// }



// NOTAS: REVISAR SI SE PUEDE EVITAR REPETIR EL PRODUCTO EN LA LISTA, EN VEZ AÑADIR UN INDICE AL LADO QUE INCREMENTA CUANDO COMPRAS MAS PRODUCTOS IGUALES
// ESTO ES OPCIONAL