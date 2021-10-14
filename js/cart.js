var carrito;

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
        <div class="mb-1">${element.currency}<span id="precio${i}">${element.unitCost}</span></div>
    </div>
    <div>Subtotal:</div>
    <div id=subtotal${i}>${element.count*element.unitCost}</div>
</div>
    `    
    }
    document.getElementById("container").innerHTML = html
    
}


function mostrarSubtotales(i){
    
    let precio = parseFloat(document.getElementById(`precio${i}`).innerText); // trae el valor de precio unitario
    let cantidad = parseFloat(document.getElementById(`cantidad${i}`).value);
    let subtotal = precio*cantidad
document.getElementById(`subtotal${i}`).innerHTML = subtotal    

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
    })
});
