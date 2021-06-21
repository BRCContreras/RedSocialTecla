const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('./conexion')
const usuario = require('./usuario')

//Definicion del modelo de usuario
const usuario_idioma = sequelize.define('idiomas', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    nombre_idioma: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    nivel_idioma: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    cert_idioma: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    nom_cert_idioma: {
        type: DataTypes.STRING(40),
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

usuario.hasMany(usuario_idioma, relacion);
usuario_idioma.belongsTo(usuario, relacion);

module.exports = usuario_idioma