//Creamos la variable que mantiene el estado visible del carrito

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
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i=0; i < botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //Agrego funcion al boton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i=0; i < botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Agregamos funcionalidad a los botones agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i=0; i <botonesAgregarAlCarrito.length; i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
        actualizarTotalCarrito();
    }
    
}


//Elimino el producto seleccionado del carrito
function eliminarProductoCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    
    //Actualizamos el total del carrito una vez que hayamos eliminado el producto del carrito
    actualizarTotalCarrito();

    //La siguiente funcion controla si hay elementos en el carrito una vez que se eliminan
    //Si no hay debo ocultar el carrito
    ocultarCarrito();
}

//Actualizamos el total del carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor del carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoProductos = carritoContenedor.getElementsByClassName('carrito-producto');
    var total = 0;

    //Recorremos cada elemento del carrito para actualizar
    for (var i =0; i < carritoProductos.length; i++){
        var producto = carritoProductos[i];
        var precioElemento = producto.getElementsByClassName('carrito-producto-precio')[0];
        console.log(precioElemento);
        //Quitamos el simbolo de dolar y el punto de milesimas
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', '.'));
        console.log(precio);
        var cantidadProducto = producto.getElementsByClassName('carrito-producto-cantidad')[0];
        var cantidad = cantidadProducto.value;
        console.log(cantidad);
        total =+ (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total + ',00';
}

function ocultarCarrito(){
    var carritoProductos = document.getElementsByClassName('carrito-productos')[0];
    if(carritoProductos.childElementCount==1){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity='0%';
        carritoVisible = false;

        //ahora maximizo el contenedor de los elementos
        var productos = document.getElementsByClassName('contenedor-productos')[0];
        productos.style.width= '100%'
    }
}

//Aumentamos en 1 la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-producto-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-producto-cantidad')[0].value = cantidadActual;
    //Actualizamos el carrito
    actualizarTotalCarrito();
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-producto-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    //Controlamos que no sea menor que 1
    if (cantidadActual >=1){
        selector.getElementsByClassName('carrito-producto-cantidad')[0].value = cantidadActual;
        // Actualizamos el carrito total
        actualizarTotalCarrito();
    }
}

function agregarAlCarritoClicked(event){
    alert();
}
