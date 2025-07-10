import { cargarProductos } from "./productos.js";

let productos = []

export async function inicializarDashboard() {
    try {
        productos = await cargarProductos();
        cardProductosDash();
        // AGREGAR 
        document.getElementById('btnAddProduct').addEventListener('click', () => {
            window.location.href = '/api/products/add-product'
        })
    } catch (error) {
        console.error('Error inicializando productos: ', error);
    }
} 

function cardProductosDash() {
    const productGrid = document.getElementById('productGrid');

    productGrid.innerHTML = productos.map(producto => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100 shadow-sm product-card" data-id="${producto.id}">
                <img src="/Imagenes/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-primary">${producto.nombre}</h5>
                    <p class="card-price text-success fw-bold fs-5">${producto.precio}</p>
                    <div class="mt-auto">
                        <div class="d-grid gap-2 product-actions">
                            <button class="btn btn-outline-primary btn-sm btn-edit" data-id="${producto.id}">
                                <i class="fas fa-edit me-1"></i>Editar</button>
                            <button class="btn-delete" data-id="${producto.id}">
                                <i class="fas fa-trash me-1"></i>Eliminar</button>
                            <button class="btn ${producto.isActive ? 'btn-warning' : 'btn-success'} btn-sm btn-toggle" data-id="${producto.id}" data-active="${producto.isActive}">
                                <i class="fas ${producto.isActive ? 'fa-toggle-on' : 'fa-toggle-off'} me-1"></i>
                                ${producto.isActive ? 'Desactivar' : 'Activar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `).join('');

        // FUNCION DE EVENTO DE BOTONES
        addButtons();
}

function addButtons() {
    // EDITAR
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            // CREAR LA RUTA DE EDITARRR #####################
            window.location.href = `/api/products/edit-product/${productId}`;
        })
    });

    // DELETE
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const productId = e.target.dataset.id;
            // CREAR LA RUTA DE ELIMINAR #####################
            const response = await fetch(`/api/products/delete-product/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                inicializarDashboard();
            }
        })
    });

    // FALTA ACTIVAR/DESACTIVAR PROD
}