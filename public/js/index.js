const urlBack = 'http://localhost:3000'


const listaMuestraProducto = document.getElementById("listaMuestraProducto");
const selectCategoria = document.getElementById("selectCategoria");
const idCategoria = document.getElementById("categorias");
const selectElement = document.querySelector('.opcionesCategorias');
const modal = document.getElementById('modal');

const listaProductos = document.querySelector('#lista-carrito tbody');
const carrito = document.getElementById('carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');




// const compra = docuemnt.getElementById('procesar-pedido');


let arrayProductos = [];
let arregloCategorias = [];
let arrayProducto = [];




//Consulta de nuestros EndPoints

//Categoria

getInfoProductos()


async function getProductosByCategoria() {
  let respuesta = await fetch(urlBack+'/usuarios');
  console.log(respuesta)
  let data = await respuesta.json();
  console.log(data)
  return data;
  
}
async function getInfoProductos() {
    let resultado = await getProductosByCategoria();
    console.log(resultado)
    arrayProductos = resultado;
    
    GuardarDB();
    
}

//Mostramos la lista de productos segun la categoria consultada
function mostrarProductos() {
  
  listaMuestraProducto.innerHTML = "";
  arrayProductos = JSON.parse(localStorage.getItem('listaUsuarios'));
  if(arrayProductos === null){
    arrayProductos = [];
}else {
  
  arrayProductos.forEach((element) => {
    listaMuestraProducto.innerHTML += `
      
      <div class="">
        <div class="card shadow-sm">
          <img src='http://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png'>
          <div class="card-body">
              <p class="card-text"><b>${element.nombre}</b></p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a href="" class="btn btn-sm btn-outline-secondary agregar-carrito" data-id="${element.id}">Solicitud de amistad</a>
                  <button  class="ver-detalle" type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Ver
                  </button>
                  <!-- Modal -->
                  <div hidden="false" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">${element.nombre}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="row g-8 ">
                            <div class="col-sm-6">
                              <img src='http://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png'>
                            </div>
                            <div class="col-sm-6">
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
            </div>
          </div>
        </div>
      `;
  });
  }
}

// Barra de busqueda
function buscar(){
  let cadena = document.getElementById('search').value;
  if(cadena.length > 2)   {
    getProductoBusqueda(cadena);
  }
  else{
    swal({
      text: "Ingresa una búsqueda válida (mín. 3 caracteres)",
      icon: "error",
      button: "Ok!",
    });
  }
}

async function getProductoBusqueda(cadena){
  let resultado = await getBusquedaProductos(cadena); 
  arrayProductos = resultado.results;
  GuardarDB();
}

async function getBusquedaProductos(cadena){
  let respuesta = await fetch('http://localhost:3000/busqueda/' +cadena);
  let data = await respuesta.json();
  return data;
}

//Guardamos en el LocalStorage la informacion de nuestra categoria consultada
const GuardarDB = () => {
  localStorage.setItem('listaUsuarios',JSON.stringify(arrayProductos));
  mostrarProductos(arrayProductos);
};

//Seleccion del articulo y consulta
listaMuestraProducto.addEventListener('click',(e)=>{
  if(e.target.classList.contains('agregar-carrito')){
    const producto = e.target.parentElement.parentElement;  
    const cesta = new Carrito();
    cesta.leerProducto(producto);
  } else if (e.target.classList.contains('ver-detalle')){
    const verProducto = e.target.parentElement.parentElement;
    mostrarDetalles(verProducto);
  }
  
  e.preventDefault();
}) 

  //Obtenemos el idProducto para eliminarlo de la cesta
  carrito.addEventListener('click',(e)=>{
    e.preventDefault();
    let producto,productoID;
    if(e.target.classList.contains('borrar-producto')){
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector('a').getAttribute('data-id');
    }
    const cesta = new Carrito();
    cesta.eliminarProductoLocalStorage(productoID);
  });

  //Boton para quitar todos los articulos que se encuentran en la cesta
  vaciarCarritoBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    while(listaProductos.firstChild){
      listaProductos.removeChild(listaProductos.firstChild);
    }
    localStorage.clear('productos');
    GuardarDB();
    return false
    
  });

  

//Boton Procesar-compra
function compra(){
  const cesta = new Carrito();
    const checaCarrito = cesta.obtenerProductosLocalStorage();
    if(checaCarrito.length === 0){

      swal({
        text: "El carrito esta vacio",
        icon: "error",
        button: "Ok!",
          });
    }else{
      location.href='/front-end/modulos/check-out/check-out.html';
    }
}
document.addEventListener('DOMContentLoaded', () =>{
  mostrarProductos() ;
  const cesta = new Carrito();
  cesta.leerLocalStorage();
} );