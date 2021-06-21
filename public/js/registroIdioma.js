const registro = document.getElementById('submit');
const nombre = document.getElementById('name');
const nivel = document.getElementById('level');
const certificado = document.getElementById('certified');
const descripcion = document.getElementById('describe');
let user = JSON.parse(localStorage.getItem('dataUsuario'))


registro.addEventListener('click', async (event) => {
    event.preventDefault();
    
    //UsuarioNuevo.recuperaUsuario(new UsuarioNuevo(email.value, contrasena.value,nombre.value,apellidos.value,movil.value,telefono.value,ciudad.value,estado.value,cp.value,));
   console.log("boton");
  
    let resultado = await fetch("http://localhost:3000/add/language", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "nombre_idioma": nombre.value,
            "nivel_idioma": nivel.value,
            "cert_idioma": certificado.value,
            "nom_cert_idioma": descripcion.value,
            "id_user": user.id
            
        })
    })
    
    swal({
        title: "Usuario registrado correctamente",
        icon: "success",
      });
    
    nuevoFormulario()

})

function nuevoFormulario(){
    location.href = 'http://localhost:3000/editProfile/'+user.id

}