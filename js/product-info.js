var product = {}; // Objeto que tiene la información del producto
let showComment = [];  // Lista de comentarios
let showProductsURL = []; // Lista de Productos relacionados


//Función que muestra la galería de imágenes

function showProductImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        if (i == 0) {
            htmlContentToAppend = ` <div class="carousel-item active">
        <img src="` + imageSrc + `" class="d-block w-100" alt="...">
        </div>`
        } else {
            htmlContentToAppend += ` <div class="carousel-item">
       <img src="` + imageSrc + `" class="d-block w-100" alt="...">
       </div>`
        }

      
        

        document.getElementById("productInfoPicturesGallery").innerHTML = htmlContentToAppend;
    }
}

//Esta función muestra la lista de comentarios

function showCommentlist(){

    let htmlContentToAppend = "";
    for(let i = 0; i < showComment.length; i++){
        let comment = showComment[i];

            htmlContentToAppend += `
           
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user +`</h4>
                           
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                        <p class="mb-1">` + comment.dateTime +  `</p>
                        <p class="mb-1">` + comment.score + `</p>
                    </div>
                </div>
            `
        }

        document.getElementById("comment-section").innerHTML = htmlContentToAppend;
}

//Esta función va a mostrar los productos relacionados
function showRelatedProducts(lista){
let htmlContentToAppend = "";
for(let i = 0; i < lista.length; i++){
    let posicion = lista[i];

        htmlContentToAppend += `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${showProductsURL[posicion].imgSrc}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">${showProductsURL[posicion].name}</p>
          <p class="card-text">${showProductsURL[posicion].description}</p>
          <p class="card-text">Cantidad de vendidos = ${showProductsURL[posicion].soldCount}</p>
          <p class="card-text">${showProductsURL[posicion].currency}</p>
          <p class="card-text">${showProductsURL[posicion].cost}</p>
        </div>
      </div>
        `
}
document.getElementById("productos-relacionados").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showComment = resultObj.data

            showCommentlist(showComment);
           
    }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj2){
        if(resultObj2.status === "ok"){
            showProductsURL = resultObj2.data
            
            getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {

                    
                    product = resultObj.data;
        
                    showRelatedProducts(product.relatedProducts)

                    let productNameHTML  = document.getElementById("productName");
                    let productDescriptionHTML = document.getElementById("productDescription");
                    let productSoldCountHTML = document.getElementById("productSoldCount");
                    let productPriceHTML = document.getElementById("productPrice");
                    let productCategoryHTML = document.getElementById("productCategory");
        
                    productNameHTML.innerHTML = product.name;
                    productDescriptionHTML.innerHTML = product.description;
                    productSoldCountHTML.innerHTML = product.soldCount;
                    productPriceHTML.innerHTML = product.currency + product.cost;
        
                    productCategoryHTML.innerHTML = product.category;
        
                    //Muestro las imagenes en forma de galería
                    showProductImagesGallery(product.images);
                }
            });

        }
    })
    
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
 
});

