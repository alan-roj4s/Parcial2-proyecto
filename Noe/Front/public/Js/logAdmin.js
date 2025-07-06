export function inicializarLoginAdmin() {
    const loginForm = document.getElementById('loginForm')
    const submitButton = loginForm.querySelector('button[type="submit"]')
    const errorElement = document.getElementById('loginError');
    
    loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        // VALIDACION DESDE EL FRONT
        if (!email || !password){
            errorElement.textContent = 'Ingrese todos los campos';
            return;
        }
        
        try {
            // DESABILITAR BOTON MIENTRAS SE LLENAN LOS CAMPOS
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
            
            const response = await fetch('/api/admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                window.location.href = data.redirect; //|| '/admin/dashboard' POR VIENE EL REIRECT SE LE PODRIA AGREGAR ESTO
            } else {
                errorElement.textContent = data.error || 'Error en las credenciales';
            }
        } catch (error) {
            errorElement.textContent = 'Error al conectar con el servidor';
            console.error('Error:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Iniciar sesion';
            }
    });
}

