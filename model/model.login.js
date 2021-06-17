const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db/conexion')

//Definicion del modelo de usuario
const usuario = sequelize.define('usuario', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    nombre: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    bandera_admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    fechaAlta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nacionalidad_user:{
        type: DataTypes.STRING(40),
        allowNull: false
    },
    nacionalidad_user:{
      type: DataTypes.STRING(40),
      allowNull: false
    },
    ciudad_res_user:{
      type: DataTypes.STRING(40),
      allowNull: false
    },
    pais_res_user:{
      type: DataTypes.STRING(40),
      allowNull: false
    },
    idioma_nat_user:{
      type: DataTypes.STRING(40),
      allowNull: false
    },
    linkedin_user:{
      type: DataTypes.STRING(40),
      allowNull: false
    },
    desc_hobbie_user:{
      type: DataTypes.STRING(40),
      allowNull: false
    },
}, {
    timestamps: true
})

module.exports = usuario

module.exports.existenciaDeUsuario = async (usr)=>{
    //chequear con la base de datos que exista el usuario
    //Usuario y pass
    //devuelvo un OK
    let resultado = await usuario.findOne({where: {email:usr.email, contrasena: usr.contrasena}})
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

module.exports.newUsuario = async (usr)=> {
    console.log(usr)
    let resultado = await usuario.create({nombre: usr.nombre, apellidos: usr.apellidos, email: usr.email , 
    movil: usr.movil, telefono: usr.telefono, ciudad: usr.ciudad, estado: usr.estado, cp: usr.cp,bandera_admin:usr.bandera_admin, contrasena: usr.contrasena,
    fechaAlta: usr.fechaAlta, idEstatus: usr.idEstatus  })

    return resultado

}

module.exports.modUsuario = async (usr) => {
  try {
    let resultado = await usuario.update({nombre: usr.nombre, apellidos: usr.apellidos, email: usr.email , 
      movil: usr.movil, telefono: usr.telefono, ciudad: usr.ciudad, estado: usr.estado, cp: usr.cp,bandera_admin:usr.bandera_admin, contrasena: usr.contrasena,
      fechaAlta: usr.fechaAlta, idEstatus: usr.idEstatus }, {where: { id : usr.id}})
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

  module.exports.listar = async ()=>{
    let resultado = await sequelize.query('SELECT * FROM usuario')
    return resultado[0]
} 

module.exports.buscarUsuarios = async (data) => {
    try{
      let resultado = await usuario.findAll({
        where: { id : data }
      })
      return resultado[0]
    }catch (err) {
      throw new Error (err)
    }
  }