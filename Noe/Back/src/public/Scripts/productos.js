

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


//  ------------ ACA VA TODO LO QUE SE NECESITA PARA INICIALIZAR LA PAG
function inicializar() {
// 
    
}

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
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
        <div class="card h-100">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">
                    <strong>Plataforma:</strong> ${producto.plataforma}<br>
   
                    <strong>Precio:</strong> $${producto.precio}
                </p>
                <button class="btn btn-primary">Agregar al carrito</button>
            </div>
        </div>
    `
    //captura señal del boton
    const botonAgregarCarro = col.querySelector('.btn-primary')

    //  evento que añade al carrito
    botonAgregarCarro.addEventListener('click', () => {
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

// Actualiza la vista del carrito
function actualizarCarrito() {
    const contenedor = document.getElementById("cart-items");
    const total = document.getElementById("total-price");
    const contador = document.getElementById("cart-count");

    contenedor.innerHTML = ""; // limpiar y actualizar
     
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No hay elementos en el carrito.</p>";
        total.textContent = "$0.00";
        contador.textContent = "0";
        return;
    }

    let sumaTotal = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("item-block");

        li.innerHTML = `
        <p class="item-name">${item.nombre} - $${item.precio}</p>
        <button class="delete-button">Eliminar</button>
        `;

        li.querySelector(".delete-button").addEventListener("click", () => {
        eliminarDelCarrito(index);
        });

        contenedor.appendChild(li);
        sumaTotal += item.precio;

    console.log("carro actualizado");
    
    });

    total.textContent = `$${sumaTotal.toFixed(2)}`;
    contador.textContent = carrito.length;
}

// Elimina producto del carrito
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
  console.log("producto eliminado");
  
}

function redirigirAlCarrito() {
    window.location.href = './carrito.html';
}

// NOTAS: REVISAR SI SE PUEDE EVITAR REPETIR EL PRODUCTO EN LA LISTA, EN VEZ AÑADIR UN INDICE AL LADO QUE INCREMENTA CUANDO COMPRAS MAS PRODUCTOS IGUALES
// ESTO ES OPCIONAL