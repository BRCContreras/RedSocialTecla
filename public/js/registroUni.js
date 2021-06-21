const registro = document.getElementById('submit');
const nombre = document.getElementById('name');
const carrera = document.getElementById('nameCarrera');
const estado = document.getElementById('certified');
let user = JSON.parse(localStorage.getItem('dataUsuario'))


registro.addEventListener('click', async (event) => {
    event.preventDefault();
    
    //UsuarioNuevo.recuperaUsuario(new UsuarioNuevo(email.value, contrasena.value,nombre.value,apellidos.value,movil.value,telefono.value,ciudad.value,estado.value,cp.value,));
   console.log("boton");
  
    let resultado = await fetch("http://localhost:3000/add/university", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "nombre_uni": nombre.value,
            "carrera_uni": carrera.value,
            "estatus_uni": estado.value,
            "id_user": user.id
            
        })
    })
    
    swal({
        title: "Universidad registrado correctamente",
        icon: "success",
      });
    
    nuevoFormulario()

})

function nuevoFormulario(){
    location.href = 'http://localhost:3000/editProfile/'+user.id

}