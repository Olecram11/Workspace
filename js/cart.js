var carrito;
var porcentajeDeEnvio;
var subtotalDelCarrito;
const TASA_DE_CAMBIO = 40;
let DATOSCARRITO = { //creo un objeto que tendrá todos los datos para realizar la compra
    nombre: "",
    calle: "",
    numero: "",
    esquina: "",
    carrito: [],
    porcentaje: "",
    moneda: TASA_DE_CAMBIO,
    subtotal: "",
    formaPago: {},

}


function mostrarProducto() {
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
    <div class="ml-5"><button class="btn btn-danger" onclick="removerCarrito(${i})">Eliminar artículo<i class="fa-solid fa-hexagon-xmark"></i> </button></div> 
</div>
    `
    }
    document.getElementById("container").innerHTML = html
    mostrarSubtotalCarrito(); // funcion llamada para mostrar subtotal carrito al comenzar
    mostrarTotal(); // funcion llamada para mostrar el porcentaje y el total al comenzar
}

function removerCarrito(i) {
    for (let index = 0; index < carrito.length; index++) {

        let cant = document.getElementById("cantidad" + index).value;
        carrito[index].count = cant;
    }
    carrito.splice(i, 1); // quitar del carrito
    mostrarProducto(); // volver a mostrar los productos
    mostrarSubtotalCarrito(); // funcion llamada para mostrar subtotal carrito al eliminar un articulo
    mostrarTotal(); // funcion llamada para mostrar el porcentaje y el total
}

function convertirMoneda(id, costo) {
    let moneda = document.getElementById(`moneda${id}`).innerHTML;
    if (moneda === "USD") {
        return costo * TASA_DE_CAMBIO;
    } else {
        return costo
    }
}

function mostrarSubtotalCarrito() {

    subtotalDelCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
        subtotalDelCarrito += convertirMoneda(i, parseFloat(document.getElementById(`subtotal${i}`).innerHTML))
    }
    document.getElementById("productCostText").innerHTML = subtotalDelCarrito
}

function mostrarTotal() {

    let totalCost = document.getElementById("totalCostText")
    let inputs = document.getElementsByName("publicationType")
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            precioSubtotal = subtotalDelCarrito
            var porcentajeDeEnvio = inputs[i].value
            var mostrarTotal = parseFloat((Math.round(precioSubtotal * porcentajeDeEnvio / 100) + precioSubtotal))
            totalCost.innerHTML = mostrarTotal
        }

    }
    mostrarPrecioEnvio()
}

function mostrarPrecioEnvio() {

    let totalCost = document.getElementById("comissionText")
    let inputs = document.getElementsByName("publicationType")
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            precioSubtotal = subtotalDelCarrito
            porcentajeDeEnvio = inputs[i].value
            var mostrarTotal = parseFloat((Math.round(precioSubtotal * (porcentajeDeEnvio / 100))))
            totalCost.innerHTML = mostrarTotal
        }

    }

}


function mostrarSubtotales(i) {

    let precio = parseFloat(document.getElementById(`precio${i}`).innerText); // trae el valor de precio unitario
    let cantidad = parseFloat(document.getElementById(`cantidad${i}`).value);

    if (cantidad < 0) {
        alert("La cantidad debe ser superior a 0")
        cantidad = 0
        document.getElementById(`subtotal${i}`).innerHTML = subtotal
    } else {
        subtotal = precio * cantidad
        document.getElementById(`subtotal${i}`).innerHTML = subtotal
    }
    mostrarSubtotalCarrito();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        carrito = resultObj.data.articles
        mostrarProducto();
        mostrarSubtotalCarrito();
        })
       
        });


function validarDatos() {
    let tarjeta = document.getElementById("tarjeta")
    let cvv = document.getElementById("cvv")
    let vencimiento = document.getElementById("vencimiento")
    let cuenta = document.getElementById("cuenta")

    tarjeta.classList.remove("is-invalid");
    cvv.classList.remove("is-invalid");
    vencimiento.classList.remove("is-invalid");
    cuenta.classList.remove("is-invalid");
    // $(`#exampleModal`).modal('hide');
     // COMPLETAR el objeto de compra
     //el nombre lo obtiene del localStorage, la direccion,nro,esq lo obtiene de los inputs y el total, porcentaje y carrito lo obtiene de las variables globales al principio del código
     DATOSCARRITO.nombre=localStorage.getItem("usuario")
     DATOSCARRITO.calle=document.getElementById("direccionCalle").value
     DATOSCARRITO.numero=document.getElementById("direccionNro").value
     DATOSCARRITO.esquina=document.getElementById("direccionEsquina").value
     DATOSCARRITO.porcentaje=porcentajeDeEnvio
     DATOSCARRITO.subtotal=subtotalDelCarrito
     DATOSCARRITO.carrito=carrito
     
          
    if (document.getElementById("exampleRadios1").checked) {
        
        if (tarjeta.value !== "" && cvv.value !== "" && vencimiento.value !== "") {
            $(`#exampleModal`).modal('hide');
            alert("¡Has comprado con éxito!") //enviar datos al servidor  
            DATOSCARRITO.formaPago={tarjeta:tarjeta.value, cvv:cvv.value, vencimiento:vencimiento.value}
            // si la forma de pago es por tarjeta, enviar tarjeta, cvv y vencimiento al DATOSCARRITO
            fetch("http://localhost:3000/carrito", {
         method: "POST", headers: {
             'Content-Type': 'application/json',
         }, body: JSON.stringify(DATOSCARRITO)
     })         // envio los datos al servidor con el método post
        } else {
            if (tarjeta.value == "") {
                tarjeta.classList.add("is-invalid")

            }
            if (cvv.value == "") {
                cvv.classList.add("is-invalid")

            }
            if (vencimiento.value == "") {
                vencimiento.classList.add("is-invalid")
            }

        }
    }
    if (document.getElementById("exampleRadios2").checked) {
        if (cuenta.value !== "") {
            $(`#exampleModal`).modal('hide');
            alert("¡Has comprado con éxito!")
            DATOSCARRITO.formaPago={cuenta:cuenta.value}
            // si la forma de pago es por cuenta bancaria envio solo la cuenta al servidor
            fetch("http://localhost:3000/carrito", {
         method: "POST", headers: {
             'Content-Type': 'application/json',
         }, body: JSON.stringify(DATOSCARRITO)
     })
        } else {
            if (cuenta.value == "") {
                cuenta.classList.add("is-invalid")
            }
        }
    }
    
    
}

document.getElementById("submitButton").addEventListener("submit", function (e) {
    e.preventDefault();
    validarDatos();


})

document.getElementById("paymentButton").addEventListener("click", function (e) {
    let calle = document.getElementById("direccionCalle")
    let nro = document.getElementById("direccionNro")
    let esquina = document.getElementById("direccionEsquina")

    calle.classList.remove("is-invalid");
    nro.classList.remove("is-invalid");
    esquina.classList.remove("is-invalid");
    
    if (calle.value !== "" && nro.value !== "" && esquina.value !== "" && carrito.length !== 0) { 
        $(`#exampleModal`).modal('show');
    } else {
        if (calle.value == "") {
            calle.classList.add("is-invalid")
            
        }
        if (nro.value == "") {
            nro.classList.add("is-invalid")
            
        }
        if (esquina.value == "") {
            esquina.classList.add("is-invalid")
        }
        if (carrito.length == 0) {
            alert("¡Tu carrito está vacío!")
        }
        $(`#exampleModal`).modal('hide');
        
    }        
    

})

