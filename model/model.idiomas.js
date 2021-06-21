const sequelize = require('../db/conexion')
const usuario = require('../db/idioma')

module.exports.existenciaDeIdioma = async (usr)=>{
    //chequear con la base de datos que exista el usuario
    //Usuario y pass
    //devuelvo un OK
    let resultado = await usuario.findOne({where: {nombre_idioma:usr.nombre_idioma}})
    // null
    if (resultado === null){
        return false
    }else {
        return true
    }
}

module.exports.recuperarInfoUser = async (usr) => {
    let resultado = await usuario.findAll({where: {email:usr.email, contrasena: usr.contrasena}})
    if (resultado === null){
      return false
    }else {
      return resultado[0]
    }
}

module.exports.newIdioma = async (usr)=> {
    console.log(usr)
    let resultado = await usuario.create({
      nombre_idioma: usr.nombre_idioma, 
      nivel_idioma: usr.nivel_idioma, 
      cert_idioma: usr.cert_idioma, 
      nom_cert_idioma: usr.nom_cert_idioma,
      id_user: usr.id_user  })

    return resultado

}

module.exports.modIdioma = async (usr) => {
  try {
    let resultado = await usuario.update({
        nombre_idioma: usr.nombre_idioma,
        nivel_idioma: usr.nivel_idioma,
        cert_idioma: usr.cert_idioma,
        nom_cert_idioma: usr.nom_cert_idioma,
        id_user: usr.id_user }, {where: { id : usr.id}})
    return resultado;
}catch (err){
    throw new Error ('No se pudo actualizar el producto seleccionado')
}
  }

module.exports.eliminarUsuario = async (id) => {
    try{
        let resultado = await usuario.destroy({
            where: { id: id }
        })
        return true
    }catch(error){
        throw console.log(error)
    }
  } 

  //module.exports.listar = async ()=>{
   // let resultado = await sequelize.query('SELECT * FROM idiomas ')
  //  return resultado[0]
//} 

module.exports.listar = async (data) => {
    try{
      let resultado = await usuario.findAll({
        where: { id_user : data }
      })
      return resultado[0]
    }catch (err) {
      throw new Error (err)
    }
  }

  module.exports.buscarIdioma = async (data) => {
    try{
      let resultado = await usuario.findAll({
        where: { id : data }
      })
      return resultado[0]
    }catch (err) {
      throw new Error (err)
    }
  }