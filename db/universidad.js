const { DataTypes, Sequelize, BOOLEAN } = require('sequelize')
const sequelize = require('./conexion')
const usuario = require('./usuario')

//Definicion del modelo de usuario
const universidad = sequelize.define('universidades', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    nombre_uni: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    carrera_uni: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    estatus_uni: {
        type: DataTypes.STRING(80),
        allowNull: false
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

usuario.hasMany(universidad, relacion);
universidad.belongsTo(usuario, relacion);

module.exports = universidad