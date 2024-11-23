//Crramos la variable que mantiene el estado visible del carrito

var carritoVisible = false;

//Esperamos que todos los elementos de la pagina se carguen para continuar con el script
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready(){
    var botonesEliminarProducto = document.getElementsByClassName('btn-eliminar');
    for (var i=0; i < botonesEliminarProducto.length; i++){
        var button = botonesEliminarProducto [i];
        button.addEventListener('click', eliminarProductoCarrito);
    }

    //Agrego funcion al boton sumar cantidad
}


//Elimino el producto seleccionado del carrito
function eliminarProductoCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
}