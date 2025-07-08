import { inicializarProductos } from "./productos.js";
import { inicializarCarrito } from "./carrito.js";
import { inicializarLoginAdmin } from "./logAdmin.js";
import { inicializarDashboard } from "./dashboard.js"
import { inicializarEdicion } from "./editarProducto.js";
import { inicializarCreacion } from "./crearProducto.js";

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // PARA CARRITO
        if (document.getElementById("cartItems")){
            console.log('Inicializando carrito...');
            inicializarCarrito();
        }
        
        // PRODUCTOS
        console.log('Inicializando productos...');
        await inicializarProductos();

        // LOGIN DEL ADMIN
        if(document.getElementById('loginForm')){
            console.log('Inicializando login...');
            inicializarLoginAdmin();
        }

        // DASHBOARD
        if (document.getElementById('productGrid')) {
            console.log('Dashboard admin inicializado');
            inicializarDashboard();
        }
            
        // CREAR PRODUCTO
        if (document.getElementById('add-product-form')) {
            inicializarCreacion();
        }
        
        // EDITAR PRODUCTO
        if (document.getElementById('edit-product-form')) {
            inicializarEdicion();
        }
            
        console.log('Inicializaciones exitosas');
    } catch (error) {
        console.error('Error al inicializar', error);
    }
});
