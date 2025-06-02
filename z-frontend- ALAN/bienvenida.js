const input = document.getElementById("nombre");
const mensaje = document.getElementById("mensaje");

input.addEventListener("input", () => {
    if (input.value.toLowerCase() === "anana") {
        mensaje.textContent = "Se escribió anana";
    }
});