//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function validar() {
    var user = document.getElementById("inputEmail").value; // Almaceno en una variable el valor del inputEmail
    var pass = document.getElementById("inputPassword").value; // Almaceno en una variable el valor del inputPassword
    if ((user !== "") && (pass !== "")) {   // corroboro que los datos no están vacíos
        localStorage.setItem("usuario", user); // guardo en el localStorage una variable usuario con el valor que estaba en el input
        window.location.href = "home.html"; // window.location redirecciona a home.html
    } else {                            //si los datos están vacios entonces abajo muestra una alerta
        alert("Debe completar los campos")
    }
}
document.addEventListener("DOMContentLoaded", function (e) {
 //  validar();
});