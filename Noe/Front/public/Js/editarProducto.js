
export function inicializarEdicion() {
    const form = document.getElementById('edit-product-form');
    if (!form){
        console.error('Formulario de edición no encontrado');
        return;
    }

    const modal = document.getElementById('confirmation-modal');
    const submitBtn = document.getElementById('submit-edit-btn');
    const confirmBtn = document.getElementById('confirm-add');
    const cancelBtn = document.getElementById('cancel-add');
    const messageContainer = document.getElementById('message-container');
    
    // OBTENGO ID DEL PRODUCTO DESDE EL URL O EL ATRIBUTO
    // const idProducto = form.getAttribute('data-product-id');
    
    submitBtn.addEventListener('click', () => {
        // e.preventDefault();
        
        const precio = parseFloat(form.precio.value);
        if (precio <= 0) {
            showMessage('El precio debe ser mayor a 0', 'error');
            return;
        }

        showConfirmationModal();
    })

    function showConfirmationModal() {
        const productInfo = `
            <strong>Nombre:</strong> ${form.nombre.value}<br>
            <strong>Categoría:</strong> ${form.categoria.value}<br>
            <strong>Precio:</strong> ${form.precio.value}<br>
        `;
        document.getElementById('product-preview').innerHTML = productInfo;
        modal.style.display = 'flex';
    } 

    confirmBtn.addEventListener('click', async () => {
        modal.style.display = 'none';

        try {
            const formData = new FormData(form);
            const productId = formData.get('productId'); // Obtiene el ID del hidden input

            showMessage('Actualizando producto...', 'info');

            const response = await fetch(`/api/products/edit-product/${productId}`, {
                method: 'PUT', // Usamos PUT en lugar de POST
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar');
            }

            const data = await response.json();
            showMessage('Producto actualizado exitosamente', 'success');
        } catch(error) {
            showMessage(error.message || 'Error al comunicarse con el servidor', 'error');
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
    }
}