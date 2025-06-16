// import script from "./script.js"

// ARRAYS
let todosLosProductos = [];
let carrito = [];

// NOTA: AUN NO HAY NINGUN LOCAL STORAGE
// EN CASO DE AÑADIR UNO, HAY QUE LIMPIAR ESTE UNA VEZ QUE EL CLIENTE FINALIZE SU COMPRA
// PARA EVITAR QUE LOS FUTUROS CLIENTES NO TENGAN PRODUCTOS EN EL CARRO
// NO SE SI EL LOCALSTORAGE ES NECESARIO




// NOTA: UNA VEZ QUE SE PUEDA PASAR LA INFORMACION DEL NOMBRE,
// HACER QUE EL NOMBRE INGRESADO APAREZCA EN LA BIENVENIDA DE LA PAGINA


// ------------------- LISTENERS / ESCUCHADORES 

document.addEventListener('DOMContentLoaded', function() {
    inicializar()
    
    //codigo encargado de redireccionar a la siguiente pagina
    const botonRedireccion = document.querySelector('#redirigirBtn')
    botonRedireccion.addEventListener('click', function() {
        redirigirAlCarrito();
    })



    // Conectar los botones de categoría al filtro
    document.querySelectorAll('[data-categoria]').forEach(btn => {
        btn.addEventListener('click', function() {
            // Cambiar estilos de botones activos
            document.querySelectorAll('[data-categoria]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filtrar productos según la categoría seleccionada
            filtrarProductos(this.dataset.categoria);
        });
    });
    
    console.log('contenido cargado con exito');
})

// --------------------------------------


//  ------------ ACA VA TODO LO QUE SE NECESITA PARA INICIALIZAR LA PAG
function inicializar() {
// 
    
}

//  ------------ CARGO LOS PRODUCTOS DESDE EL JSON
function traerProductos(){
    return fetch ('../Scripts/productos.json') // solucionado, el fetch al ser llamado en el html, buscaba en la carpeta pantallas, fue cambiado para que busque el json en Scripts
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





// -- FILTRADO DE PRODUCTOS

function filtrarProductos (categoria){   // export removido
    const gamesContainer = document.getElementById('gamesContainer')
    const consolesContainer = document.getElementById('consolesContainer')

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
}


// -------------- CREA LA CARTA QUE MUESTRA EN PANTALLA
function crearCardProducto(producto) {    // export removido
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