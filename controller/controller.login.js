const sequelize = require('../db/conexion');
const dbUsuarios = require ('../model/model.login');
const dbIdioma = require ('../model/model.idiomas');
const dbUni = require ('../model/model.universidad');
const jwt = require('jsonwebtoken');

module.exports.listarIdiomas = async (usr) =>{
    try{
        let resultado = await dbIdioma.listar(usr);
        return resultado;
    }catch(err){
        throw new Error ('Ocurrio un problema en la consulta con la db ')
    }
}

module.exports.listarUsuarios = async (usr) =>{
    try{
        let resultado = await dbUsuarios.listar(usr);
        return resultado;
    }catch(err){
        throw new Error ('Ocurrio un problema en la consulta con la db ')
    }
}
module.exports.verificarUsuario = async (usr)=>{
    let usrchk = usr
    try {
        let resultado =  await dbUsuarios.existenciaDeUsuario(usrchk)

        if (resultado) {
            return resultado
        }else {
            throw new Error ('No existe el usuario')
            
        }
    }catch (err){
        console.log(err)
        throw new Error (' no semuy bien que paso')
    }
}

module.exports.datosUsuario = async (usr) => {
    let usrchk = usr
    try {
        let resultado =  await dbUsuarios.recuperarInfoUser(usrchk)
        if (resultado) {
            return resultado
        }else {
            throw new Error ('No hay datos de Usuario')
        }
    }catch (err){
        console.log(err)
        throw new Error (' no semuy bien que paso')
    }
}

module.exports.generaToken = async (data)=>{
    try {
        let resultado = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data
            }, process.env.SECRET_KEY
        )
        return resultado
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}

module.exports.crearUsuario = async (usuarioNuevo)=>{
    try {
        let resultado = await dbUsuarios.existenciaDeUsuario(usuarioNuevo)
        if (resultado) {
            throw new Error ('El usuario ya existe')
        }else {
            let usuarioResult = await dbUsuarios.newUsuario(usuarioNuevo)
            return 'Usuario creado'
        }

    }catch (err){
        console.log(err)
        throw new Error ('no pude generar el usuario')
    }
}

module.exports.modificarUsuario = async (usuarioMod)=>{
    try {
        let usuarioResultado = await dbUsuarios.modUsuario(usuarioMod);   
        return usuarioResultado
    }catch (err){
        throw new Error ('No se pudo actualizar el usuario seleccionado')
    }
}

module.exports.modificarIdioma = async (usuarioMod)=>{
    try {
        let usuarioResultado = await dbIdioma.modIdioma(usuarioMod);   
        return usuarioResultado
    }catch (err){
        throw new Error ('No se pudo actualizar el usuario seleccionado')
    }
}

module.exports.eliminarUsuario = async (data) => {
    try {
        let resultado = await dbUsuarios.eliminarUsuario(data) 
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el usuario seleccionado')
    }
};

module.exports.eliminarIdioma = async (data) => {
    try {
        let resultado = await dbIdioma.eliminarIdioma(data) 
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el usuario seleccionado')
    }
};
module.exports.buscarUsuario = async (data)=>{
    try {
        let resultado = await dbUsuarios.buscarUsuarios(data)
        return resultado
    }catch (err) {
        throw new Error ('Ocurrio un problema en el controlador al BUSCAR usuario')
    }
}

module.exports.buscarIdioma = async (data)=>{
    try {
        let resultado = await dbIdioma.buscarIdiomas(data)
        return resultado
    }catch (err) {
        throw new Error ('Ocurrio un problema en el controlador al BUSCAR usuario')
    }
}

module.exports.agregarIdioma = async (idiomaNuevo)=>{
    try {
        let resultado = await dbIdioma.existenciaDeIdioma(idiomaNuevo)
        if (resultado) {
            throw new Error ('El usuario ya existe')
        }else {
            let usuarioResult = await dbIdioma.newIdioma(idiomaNuevo)
            return 'Usuario creado'
        }

    }catch (err){
        console.log(err)
        throw new Error ('no pude agregar el idioma')
    }

    
}

//////Universidad
module.exports.agregarUniversidad = async (idiomaNuevo)=>{
    try {
        let resultado = await dbUni.existenciaDeUniversidad(idiomaNuevo)
        if (resultado) {
            throw new Error ('El usuario ya existe')
        }else {
            let usuarioResult = await dbUni.newUniversidad(idiomaNuevo)
            return 'Usuario creado'
        }

    }catch (err){
        console.log(err)
        throw new Error ('no pude agregar la universidad')
    }
}

module.exports.listarUni = async (usr) =>{
    try{
        let resultado = await dbUni.listar(usr);
        return resultado;
    }catch(err){
        throw new Error ('Ocurrio un problema en la consulta con la db ')
    }
}

module.exports.modificarUni = async (usuarioMod)=>{
    try {
        let usuarioResultado = await dbUni.modUni(usuarioMod);   
        return usuarioResultado
    }catch (err){
        throw new Error ('No se pudo actualizar el usuario seleccionado')
    }
}

module.exports.eliminarUni = async (data) => {
    try {
        let resultado = await dbUni.eliminarUni(data) 
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el usuario seleccionado')
    }
};

module.exports.buscarUni = async (data)=>{
    try {
        let resultado = await dbUni.buscarUnis(data)
        return resultado
    }catch (err) {
        throw new Error ('Ocurrio un problema en el controlador al BUSCAR usuario')
    }
}