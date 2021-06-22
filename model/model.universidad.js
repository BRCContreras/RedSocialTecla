const sequelize = require('../db/conexion')
const usuario = require('../db/universidad')
const { Op } = require("sequelize");

module.exports.existenciaDeUniversidad = async (usr)=>{
    //chequear con la base de datos que exista el usuario
    //Usuario y pass
    //devuelvo un OK
    let resultado = await usuario.findOne({where:{[Op.and]: [ {nombre_uni:usr.nombre_uni },{ id_user:usr.id_user}]}})
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

module.exports.newUniversidad = async (usr)=> {
    console.log(usr)
    let resultado = await usuario.create({
      nombre_uni: usr.nombre_uni, 
      carrera_uni: usr.carrera_uni, 
      estatus_uni: usr.estatus_uni, 
      id_user: usr.id_user  })

    return resultado

}

module.exports.modUni = async (usr) => {
  try {
    let resultado = await usuario.update({
        nombre_uni: usr.nombre_uni, 
        carrera_uni: usr.carrera_uni, 
        estatus_uni: usr.estatus_uni, 
        id_user: usr.id_user  }, {where: { id : usr.id}})
    return resultado;
}catch (err){
    throw new Error ('No se pudo actualizar el producto seleccionado')
}
  }

module.exports.eliminarUni = async (id) => {
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

  module.exports.buscarUnis = async (data) => {
    try{
      let resultado = await usuario.findAll({
        where: { id : data }
      })
      return resultado[0]
    }catch (err) {
      throw new Error (err)
    }
  }