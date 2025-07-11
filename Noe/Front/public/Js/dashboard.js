// import { cargarProductos } from "./productos.js"; 
// import hdp con razon desaparecias cuando desactivava el producto


let productos = []
let currentPage = 1;
let totalPages = 1;



export async function inicializarDashboard(page = 1) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/dashboard-products?page=${page}`);
        const data = await response.json();
        
        productos = data.productos;
        currentPage = data.currentPage;
        totalPages = data.totalPages;
        
        cardProductosDash();
        renderPagination();
        
        document.getElementById('btnAddProduct').addEventListener('click', () => {
            window.location.href = '/api/products/add-product';
        });
    } catch (error) {
        console.error('Error inicializando dashboard:', error);
    }
}


// RENDER DE LA PAGINACION
function renderPagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `btn ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            inicializarDashboard(i);
        });
        paginationContainer.appendChild(pageBtn);
    }
}

// ========================


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
                            <button class="btn ${producto.activo ? 'btn-warning' : 'btn-success'} btn-sm btn-toggle" data-id="${producto.id}">
                                <i class="fas ${producto.activo ? 'fa-toggle-on' : 'fa-toggle-off'} me-1"></i>
                                ${producto.activo ? 'Desactivar' : 'Activar'}
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
            window.location.href = `/api/products/edit-product/${productId}`;
        })
    });

    // DELETE
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const productId = e.target.dataset.id;
            const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            // CREAR LA RUTA DE ELIMINAR #####################

            document.getElementById('confirmDeleteBtn').onclick = async () => {
                try {
                    const response = await fetch(`/api/products/delete-product/${productId}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        modal.hide();
                        inicializarDashboard();
                    }
                } catch (error) {
                    console.error("error al eliminar:", error)
                }
            };

            modal.show()
        })
    });


    // ACTIVAR / DESACTIVAR
    document.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const productId = e.target.closest('.btn-toggle').dataset.id;
        try {
            const response = await fetch(`http://localhost:3000/api/products/toggle-status/${productId}`,  {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                await inicializarDashboard(); // Recargar la vista
            } else {
                console.error("======================Error del servidor:", await response.text());
            }
        } catch (error) {
            console.error("Error cambiando estado:", error);
        }
    });
});
}