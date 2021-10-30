//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var perfil = localStorage.getItem("miperfil")
    perfil = JSON.parse(perfil)
    if (perfil !== null) {
    document.getElementById("nombre").value = perfil.nombre
    document.getElementById("apellido").value = perfil.apellido
    document.getElementById("email").value = perfil.email
    document.getElementById("edad").value = perfil.edad
    document.getElementById("telefono").value = perfil.telefono
    
    }
});

function miPerfil() {
    let datos = {}
    let userName = document.getElementById("nombre").value; // Almaceno en una variable el valor del nombre
    let userSurName = document.getElementById("apellido").value; // Almaceno en una variable el valor del apellido
    let userEmail = document.getElementById("email").value;
    let userAge = document.getElementById("edad").value;
    let userPhone = document.getElementById("telefono").value;
     datos.nombre = userName
     datos.apellido = userSurName
     datos.email = userEmail
     datos.edad = userAge
     datos.telefono = userPhone
    localStorage.setItem("miperfil", JSON.stringify(datos)); // guardo en el localStorage unas variables con el valor que estaba en el input de cada una de ellas en mi perfil
    
}