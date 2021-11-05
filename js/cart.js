var carrito;
var subtotalDelCarrito;
const TASA_DE_CAMBIO = 40;

function mostrarProducto(){
    let html = ""
    for (let i = 0; i < carrito.length; i++) {
        let element = carrito[i];
    html += `<div class="row">
    <div class="col-3">
        <img src="${element.src}" class="img-thumbnail">
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${element.name}</h4>
            <input id="cantidad${i}" type="number" min="1" class="inputs" value="${element.count}" onchange="mostrarSubtotales(${i})"></input>
        </div>
        <div class="mb-1"><span id="moneda${i}">${element.currency}</span><span id="precio${i}">${element.unitCost}</span></div>
    </div>
    <div>Subtotal:</div>
    <div id=subtotal${i}>${element.count*element.unitCost}</div>
</div>
    `    
    }
    document.getElementById("container").innerHTML = html
    
}

function convertirMoneda(id, costo){
let moneda = document.getElementById(`moneda${id}`).innerHTML;
if (moneda === "USD"){
 return costo * TASA_DE_CAMBIO;
} else {
 return costo
}
}

function mostrarSubtotalCarrito(){
    
    subtotalDelCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
        subtotalDelCarrito += convertirMoneda(i, parseFloat(document.getElementById(`subtotal${i}`).innerHTML))
    }
    document.getElementById("productCostText").innerHTML=subtotalDelCarrito
}

function mostrarTotal(){

    let totalCost = document.getElementById("totalCostText")
    let inputs = document.getElementsByName("publicationType")
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked){
            precioSubtotal = subtotalDelCarrito
            var porcentajeDeEnvio = inputs[i].value
            var mostrarTotal = parseFloat((Math.round(precioSubtotal*porcentajeDeEnvio/100)+precioSubtotal))
            totalCost.innerHTML = mostrarTotal
        }
        
    }
    mostrarPrecioEnvio()
}

function mostrarPrecioEnvio(){

    let totalCost = document.getElementById("comissionText")
    let inputs = document.getElementsByName("publicationType")
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked){
            precioSubtotal = subtotalDelCarrito
            var porcentajeDeEnvio = inputs[i].value
            var mostrarTotal = parseFloat((Math.round(precioSubtotal*(porcentajeDeEnvio/100))))
            totalCost.innerHTML = mostrarTotal
        }
        
    }

}


function mostrarSubtotales(i){
    
    let precio = parseFloat(document.getElementById(`precio${i}`).innerText); // trae el valor de precio unitario
    let cantidad = parseFloat(document.getElementById(`cantidad${i}`).value);
    subtotal = precio*cantidad
document.getElementById(`subtotal${i}`).innerHTML = subtotal    
mostrarSubtotalCarrito();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    fetch(CART_INFO_URL).then(function(resultObj){
        return resultObj.json();
    })
    .then(function(resultObj2){
        carrito = resultObj2.articles
    mostrarProducto();
    mostrarSubtotalCarrito();
    })
});
