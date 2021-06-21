const registro = document.getElementById('submit');
const nombre = document.getElementById('name');
const carrera = document.getElementById('nameCarrera');
const estado = document.getElementById('certified');
const id = document.getElementById('idUser');
const user = JSON.parse(localStorage.getItem('dataUsuario'))



registro.addEventListener('click', async (event) => {
    event.preventDefault();
    //UsuarioNuevo.recuperaUsuario(new UsuarioNuevo(email.value, contrasena.value,nombre.value,apellidos.value,movil.value,telefono.value,ciudad.value,estado.value,cp.value,));
   console.log("boton");
   //let data = await JSON.parse(localStorage.getItem('dataUsuario'))
   
    let resultado = await fetch("http://localhost:3000/modificarUni", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            //'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify( {
            "id": id.value,
            "nombre_uni": nombre.value,
            "carrera_uni": carrera.value,
            "estatus_uni": estado.value,
            "id_user": user.id
            
        })
        
    })

    if(resultado)    {
        swal({
            title: "Se actualizo la informacion del usuario correctamente",
            icon: "success",
          });
          setTimeout(() => {
            location.href = '/editProfile/'+data.id
        }, 3000);
    }
    console.log('resultadooo',resultado)
   
})