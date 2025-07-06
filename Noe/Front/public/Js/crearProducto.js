
export function inicializarAdminDashboard() {
    const form = document.getElementById('add-product-form');
    const modal = document.getElementById('confirmation-modal');
    
    const confirmBtn = document.getElementById('confirm-add');
    const cancelBtn = document.getElementById('cancel-add');

    const messageContainer = document.getElementById('message-container');

    // SI NO ESTA EL FORMULARIO, SALE
    // if (!form) return;
    console.log('Inicializando dashboard admin...');

    // let formData = new FormData();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // VALIDO PRECIO
        const precio = parseFloat(form.precio.value);
        if (precio <= 0) {
            showMessage('El precio debe ser mayor a 0', 'error');
            return;
        }

        // MOSTRAR MODAL DE CONFIRMACION
        showConfirmationModal();
    });

    function showConfirmationModal() {
        const productInfo = `
            <strong>Nombre:</strong> ${form.nombre.value}<br>
            <strong>Categoria:</strong> ${form.categoria.value}<br>
            <strong>Plataforma:</strong> ${form.plataforma.value}<br>
            <strong>Precio:</strong> ${form.precio.value}<br>
        `;

        const preview = document.getElementById('product-preview');
        preview.innerHTML = productInfo;
        modal.style.display = 'flex';
    }

    confirmBtn.addEventListener('click', async () => {
        modal.style.display = 'none';

        try {
            const formData = new FormData(form);
            showMessage('Agregando producto...', 'info');

            const response = await fetch('/api/products/add-product',
                {
                    method: 'POST',
                    body: formData
                });

            // pARA VERIFICAR SI LA RESPUESTA ES JSON
            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')){
                const text = await response.text();
                throw new Error(text || 'respuesta no JSON del servidor')
            };

            const data = await response.json();

            if (response.ok) {
                showMessage('Producto agregado exitosamente');
                form.reset(); // LIMPIA EL FORMULARIO
            } else {
                throw new Error(data.error || 'Error al agregar producto');
            }
        } catch (error) {
            console.error('Error: ', error)
            showMessage(error.message || 'error al comunicarse con el servidor', 'error')
        }
    })

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    })

    function showMessage(message, type) {
        messageContainer.innerHTML = `
            <div class="alert alert-${type}">
                ${message}
            </div>
        `;
    // OCULTAR MENSAJE DESPUES DE 5SEGUNDOS??
        // if (type !== 'info') {
        //     setTimeout(() => {
        //         messageContainer.innerHTML = '';
        //     }, 5000);
        // }
    }

    // DESLOGUIARSE. CONFIRMAR SI HAY UN RUTA PARA ESO
    // const logoutBtn = document.getElementById('logoutBtn');
    // if (logoutBtn) {
    //     logoutBtn.addEventListener('click', () => {
    //         console.log('Carrando sesion');
    //         window.location.href = '/logout';
    //     })
    // }
}
    