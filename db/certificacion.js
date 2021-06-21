const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('./conexion')
const usuario = require('./usuario')

//Definicion del modelo de usuario
const usuario_cert = sequelize.define('certificaciones', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    nombre_cert: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    descripcion_cert: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
}, {
    timestamps: true
})

let relacion = {
    foreignKey: {
        name: 'id_user',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
};

usuario.hasMany(usuario_cert, relacion);
usuario_cert.belongsTo(usuario, relacion);

module.exports = usuario_cert