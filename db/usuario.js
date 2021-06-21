const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('./conexion')


//Definicion del modelo de usuario
const usuario = sequelize.define('usuario', {
    id : {
        type: Sequelize.INTEGER,
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
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: {
            args: true,
            msg: 'Correo electrónico ya registrado'
        }
    },
    bandera_admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
}, {
    timestamps: true
})


module.exports = usuario