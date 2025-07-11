let carrito = {};

export function inicializarCarrito() {
    cargarLocalStorage();
    configurarEventos();
    renderizarItems();
}

function configurarEventos() {
    // EVENTO DEL FORM PARA TICKET
    const checkoutForm = document.getElementById('checkoutForm');
    if(checkoutForm) {
        checkoutForm.addEventListener('submit', procesarTicket);
    }
    localStorage.clear();
}


// Agrega producto al carrito
export function agregarAlCarrito(producto) {
    const id_carrito = producto.id;

    if(carrito[id_carrito]){
        // SI YA EXISTE EL PRODUCTO EN EL CARRITO, INCREMENTA CANTIDAD
        carrito[id_carrito].cantidad += 1;
    } else {
        // SI NO EXISTE LO AGREGA
        carrito[id_carrito] = {
            ...producto,
            cantidad: 1
        };
    }
    
    renderizarItems()
    guardarToLocalStorage();
    console.log("producto agregado");
}

// Elimina producto del carrito POR ID
function eliminarDelCarrito(id) {
    delete carrito[id];
    renderizarItems();
    guardarToLocalStorage();
    console.log("producto eliminado");
}

function calcularTotal() {    
    return Object.values(carrito).reduce((total, item) => {
        const precio = parseFloat(item.precio);
        const cantidad = parseInt(item.cantidad, 10);
        return total + (precio * cantidad);
    }, 0)
}



// Actualiza la vista del carrito
function renderizarItems() {
    const contenedor = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");
    // const contador = document.getElementById("cart-count");
    // if (!contenedor || !total) return;
    contenedor.innerHTML = ""; 

    const items = Object.values(carrito);
    const sumaTotal = calcularTotal();

    items.forEach((item) => {
        const div = document.createElement("div");
        div.className = "cart-item d-flex justify-content-between align-items-center mb-2 p-2";

        //  AGREGA AL SMALL ${(item.precio * item.cantidad).toFixed(2)} ??
        div.innerHTML = `
            <div class="item-info"> 
                <strong class="item-name mb-0 text-white">${item.nombre}</strong><br>
                <small class="text-muted">${item.precio.toFixed(2)} x ${item.cantidad}</small>
            </div>
            
            <button class="delete-button" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;

        div.querySelector(".delete-button").addEventListener("click", (e) => {
            const id = e.target.closest('.delete-button').dataset.id;
            eliminarDelCarrito(id);
        });

        contenedor.appendChild(div);
        
        console.log("carro actualizado");
    
    });

    total.textContent = sumaTotal.toFixed(2);
    // contador.textContent = carrito.length;
}

// ------------- TOMAR LOS DATOS PARA EL TICKET
function procesarTicket(event) {
    
    const formData = {
        userName: obtenerNombreUsuario(),
        formCartItems: JSON.stringify(carrito),
        formCartTotal: calcularTotal().toFixed(2)
    };

    console.log("Datos a enviar:", formData);

    // Asignar valores a los campos ocultos
    document.getElementById('formUserName').value = formData.userName;
    document.getElementById('formCartItems').value = formData.formCartItems;
    document.getElementById('formCartTotal').value = formData.formCartTotal;
    
    event.target.submit();
}

// Esta función busca el userName que está renderizado en productos.ejs
function obtenerNombreUsuario() {
    const span = document.querySelector('span.fw-bold.text-primary');
    return span ? span.textContent.trim() : 'Invitado';
}

// ------------- GUARDAR Y TRAER DEL LOCAL STORAGE
function guardarToLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function cargarLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    console.log('Carrito cargado desde localS', carritoGuardado);
    if(carritoGuardado) {
        carrito = JSON.parse(carritoGuardado) || {};
    }
    console.log('carrito actual', carrito);
}

// function actualizarInputCarrito() {
//     const inputCarrito = document.getElementById('cartItemsInput');
//     if (carrito.length === 0) {
//         inputCarrito.value = "[]"; // Siempre un JSON válido
//     } else {
//         inputCarrito.value = JSON.stringify(carrito);
//     }
// }
