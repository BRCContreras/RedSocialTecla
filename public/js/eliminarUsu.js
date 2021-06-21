async function eliminarIdioma(id_usuario) {
    let data = await JSON.parse(localStorage.getItem('dataUsuario'))
            try {
                let resultado = fetch("http://localhost:3000/deleteLanguage/" + id_usuario, {
                method: 'get',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${data.token}`
                }
                })
                if(resultado.status === 400){
                    swal({
                        title: "No tienes permiso para eliminar usuarios" ,
                        icon: "error",
                      });
                } else {
                    swal({
                        title: "Idioma Eliminado Correctamente",
                        icon: "success",
                    });
                    setTimeout(() => {
                        location.href = '/editProfile/'+data.id
                    }, 3000);
                }
    
            } catch (error) {
                swal({
                    title: "No tienes permiso para eliminar usuarios",
                    icon: "error",
                  });
            }
       
      
}