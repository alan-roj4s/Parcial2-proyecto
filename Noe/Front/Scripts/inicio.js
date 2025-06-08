export let currentUser = '';
// ------------ NAVEGACION ENTRE PANTALLAS
export function showScreen (screenId) {
    // TODOS LOS QUE TENGAN LA CLASE SCREEN SE REMUEVE EL ACTIVE PARA QUE NO SE MUESTRE
    document.querySelectorAll('.screen').forEach(screen =>{
        screen.classList.remove('active');
    });
    // EL ID SE LO PASO EN EL HTML Y LE AGREGO LA CLASE ACTIVE PARA QUE ME LO MUESTRE
    document.getElementById(screenId).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
}

// VALIDAR ELEMENTOS EN EL DOM
export function startShopping() {
    const nameInput = document.getElementById('customerName');
    const nameDisplay = document.getElementById('customerNameDisplay');
    const name = nameInput.value.trim();

    if(!name){
        alert('Por favor, ingresa tu nombre para continuar.');
        return false;
    }

    currentUser = name;
    nameDisplay.textContent = name;

    // MOSTRAR PANTALLA DE CLIENTE
    // OCULTAMOS ADMIN 
    document.getElementById('productsLink').style.display = 'block';
    document.getElementById('cartLink').style.display = 'none';
    document.getElementById('loginNav').style.display = 'none';

    // CAMBIO A PANTALLA PRODUCTO
    showScreen('products');

    return true;
}