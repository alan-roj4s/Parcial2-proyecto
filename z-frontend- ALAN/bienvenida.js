const input = document.getElementById("nombre");
const form = document.getElementById("ingreso")
const test = document.getElementById("test")


let usuarios = []; //este es solo simulacion



function ingreso(event) {
    event.preventDefault(); 

    if (input.value.toLowerCase() != "") {

        // aqui se debe insertar un llamado al backend, en el que
        // llamara al servidor para que el server 
        // inserte el nombre y la id en el json


        // a continuacion, una simulacion
        const insertarUsuario = {
            nombre: input.value.trim()
        }
        usuarios.push(insertarUsuario)



        // este solo muestra el nombre mas reciente
        test.textContent = `ultimo nombre: ${insertarUsuario.nombre}`;




        // window.location.href = "placeholder.html"; // Redirige
    } 
    else {
        alert ("por favor ingrese un nombre")
    }
}

// asocia el form al evento submit
form.addEventListener("submit", ingreso);







// HECHO --------------------------agregar un boton en el form de continuar, al apretarlo este debe llevar al placeholder
// una vez que se compruebe que funciona, crear un json en el que
// se guarde la informacion del usuario en el caso que no exista