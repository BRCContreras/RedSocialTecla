const usersServices = require('../controller/controller.login')
const middJsonAuth = require ('../midd/midd.jsonAuth')


module.exports = (app) => {
   

    app.get('/login', async (req,res)=>{
        try{
            res.render('login');
        }catch(err){
            console.log(err);
            res.status(400).json('No se puede mostrar');
        }

    })

    app.get('/index', async (req,res)=>{
        try{
            res.render('index');
        }catch(err){
            console.log(err);
            res.status(400).json('No se puede mostrar');
        }

    })

    app.post('/login',middJsonAuth.chkLogin, async (req,res)=>{
        
        let usuario = req.body
        try {
            let resultado = await usersServices.verificarUsuario(usuario)
            if (resultado){
                let usuarioInfo = await usersServices.datosUsuario(usuario)
                let tokenResult = await usersServices.generaToken(usuario)
                res.json({token: tokenResult, user: usuarioInfo})
            }else {
                throw new Error (err)
            }
        }catch (err){
            console.log(err)
            res.status(400).json('Usuario o contrasena incorrecta')
        }
    })

    app.get('/add', async (req,res)=>{
        try{
            res.render('registro');
        }catch(err){
            console.log(err);
            res.status(400).json('No se puede mostrar');
        }

    })

    app.post('/add',middJsonAuth.chkRegistro, async (req, res)=>{
        let usuarioNuevo = req.body
        try {
            let resultado = await usersServices.crearUsuario(usuarioNuevo)
            res.status(200).json('usuario creado correctamente')
        }catch (err){
            console.log(err)
            res.status(400).json('algo raro paso')
        }
    })

    app.get('/users', async (req,res)=>{
        try {
            let resultado = await usersServices.listarUsuarios();
            console.log("estos son los usuarios", resultado);
            res.send(resultado)
        }catch (err){
            console.log(err)
            res.status(400).json('Error al dirigirse a la ruta vistas')
        }
    })

    app.get('/profile/:id', async (req,res)=>{
        let data = req.params.id;
        try {
            let resultado = await usersServices.buscarUsuario(data)
            res.render('profileUser', {
                result:resultado.dataValues 
            })
            // res.send(200,resultado[id]);
        }catch (err){
            res.status(400).json('Error al dirigirse al perfil del usuario')
        }
    })

    app.get('/friends', async (req,res)=>{
        try {
            let resultado = await usersServices.listarUsuarios();
            res.render('friendsUser', {results:resultado});
            res.send(200,resultado)
        }catch (err){
            console.log(err)
            res.status(400).json('Error al dirigirse a la ruta vistas')
        }
    }) 

    app.get('/editProfile/:id', async (req,res)=>{
        let data = req.params.id;
        try {
            let resultado = await usersServices.buscarUsuario(data)
            res.render('editProfile', {
                result:resultado.dataValues 
            })
           
        }catch(err){
            console.log(err);
            res.status(400).json('No se puede mostrar');
        }

    })

    app.get('/editProfile/language/:id', async (req,res)=>{
        let resultado = req.params.id;
        try{
            res.render('language', {
                result:resultado
            })
        }catch(err){
            console.log(err);
            res.status(400).json('No se puede mostrar');
        }

    })
        
}
