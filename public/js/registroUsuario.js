const registro = document.getElementById('submit');
const nombre = document.getElementById('firstName');
const apellidos = document.getElementById('lastName');
const email = document.getElementById('email');
const contrasena = document.getElementById('pass');
const contrasena2 = document.getElementById('pass2');


registro.addEventListener('click', async (event) => {
    event.preventDefault();
    
    //UsuarioNuevo.recuperaUsuario(new UsuarioNuevo(email.value, contrasena.value,nombre.value,apellidos.value,movil.value,telefono.value,ciudad.value,estado.value,cp.value,));
   console.log("boton");
    if(contrasena.value === contrasena2.value){
    let resultado = await fetch("http://localhost:3000/add", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "nombre": nombre.value,
            "apellidos": apellidos.value,
            "email": email.value,
            "bandera_admin": '2',
            "contrasena": contrasena.value,
            
        })
    })
    
    swal({
        title: "Usuario registrado correctamente",
        icon: "success",
      });
    
    nuevoFormulario()
}else
{
    swal({
        title: "Las contraseñas deben de coincidir",
        icon: "warning",
      });
      contrasena.value=" ";
      contrasena2.value=" ";
}
})

function nuevoFormulario(){
    nombre.value=" ";
    apellidos.value=" ";
    email.value=" ";
    contrasena.value=" ";
      contrasena2.value=" ";

}