const CATEGORIES_URL = "http://localhost:3000/categorias";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publicacionexitosa";
const CATEGORY_INFO_URL = "http://localhost:3000/autos";
const PRODUCTS_URL = "http://localhost:3000/productos";
const PRODUCT_INFO_URL = "http://localhost:3000/productosinfo";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/productoscomentarios";
const CART_INFO_URL = "http://localhost:3000/carrito";
const CART_BUY_URL = "http://localhost:3000/compraexitosa";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

var nombreusuario = localStorage.getItem("usuario") // Obtenemos del localStorage el usuario que guardamos en el login

if (nombreusuario == undefined) { //si lo que encontro en el localStorage esta vacío
  window.location.href = "index.html" // entonces redirecciona al login
} else { // sino

var ausuario = document.getElementById("nombreUsuario")  // Obtengo el elemento "a" del HTML a través del ID

ausuario.innerHTML = nombreusuario   // Al elemento "a" le pongo el nombre del usuario
}
});

document.addEventListener("DOMContentLoaded", function(e){

//  var perfil = localStorage.getItem("miperfil") // Obtenemos del localStorage los datos del perfil

 

});