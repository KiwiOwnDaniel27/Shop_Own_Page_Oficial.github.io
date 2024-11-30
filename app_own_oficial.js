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
    var botonesAñadirAlCarrito = document.getElementsByClassName('boton-producto');
    for (var i=0; i <botonesAñadirAlCarrito.length; i++){
        var button = botonesAñadirAlCarrito[i];
        button.addEventListener('click', añadirAlCarritoClicked);
        actualizarTotalCarrito();
    }
    
    //Agregar funcionalidad al boton añadir al carrito
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
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
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total + ',00';
}

function ocultarCarrito(){
    var carritoProductos = document.getElementsByClassName('carrito-productos')[0];
    if(carritoProductos.childElementCount==0){
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

function añadirAlCarritoClicked(event){
    var button = event.target;
    var producto = button.parentElement;
    var titulo = producto.getElementsByClassName('titulo-producto')[0].innerText;
    console.log(titulo);
    var precio = producto.getElementsByClassName('precio-producto')[0].innerText;
    var imagenSrc = producto.getElementsByClassName('img-producto')[0].src;
    console.log(imagenSrc);

    //La siguiente funcion agrega el elemento al carrito, lo mandamos por parametros los valores
    añadirProductoAlCarrito(titulo, precio, imagenSrc);

    //Hacemos visible al carrito cuando se agrega por primera vez
    hacerVisibleCarrito();
}

function añadirProductoAlCarrito(titulo, precio, imagenSrc){
    var producto = document.createElement('div');
    producto.classList.add = 'productos';
    var productosCarrito = document.getElementsByClassName('carrito-productos')[0];

    //Vamos a controlar que el producto que esta ingresando no se encuentre ya en el carrito
    var nombresProductosCarrito = productosCarrito.getElementsByClassName('carrito-producto-titulo');
    for(var i=0; i < nombresProductosCarrito.length; i++){
        if(nombresProductosCarrito[i].innerText==titulo){
            alert("El producto ya se encuentra en el carrito");
            return;
        }
    }

    var ProductoCarritoContenido = `
    <div class="carrito-producto">
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrito-producto-detalles">
            <span class="carrito-producto-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <br>
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-producto-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <br>
            <span class="carrito-producto-precio">${precio}</span>
        </div>
        <br> 
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `
    producto.innerHTML = ProductoCarritoContenido;
    productosCarrito.append(producto);

    //Agregamos la funcionalidad de eliminar el nuevo producto
    producto.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarProductoCarrito);

    //Agregamos la funcionalidad de sumar el nuevo producto
    var botonesSumarCantidad = producto.getElementsByClassName('sumar-cantidad')[0];
    botonesSumarCantidad.addEventListener('click', sumarCantidad);

   //Agregamos la funcionalidad de restar el nuevo producto
    var botonesRestarCantidad = producto.getElementsByClassName('restar-cantidad')[0];
    botonesRestarCantidad.addEventListener('click', restarCantidad);
    actualizarTotalCarrito();
}

function pagarClicked(event){
    alert("Gracias por su compra");
    //elimino todos los elementos del carrito
    var carritoProductos = document.getElementsByClassName('carrito-productos')[0];
    while(carritoProductos.hasChildNodes()){
        carritoProductos.removeChild(carritoProductos.firstChild);
    }
    actualizarTotalCarrito();

    //funcion que hace ocultar al carrito
    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var productos = document.getElementsByClassName('contenedor-productos')[0];
    productos.style.width='60%';
}
