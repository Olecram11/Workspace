//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function validar() {
    var user = document.getElementById("inputEmail");
    var pass = document.getElementById("inputPassword");
    if ((user.value !== "") && (pass.value !== "")) {
        window.location.href = "index.html";
    } else {
        alert("Debe completar los campos")
    }
}
document.addEventListener("DOMContentLoaded", function (e) {
   validar();
});