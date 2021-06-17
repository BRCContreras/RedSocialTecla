const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db/conexion')

//Definicion del modelo de usuario
const universidad = sequelize.define('usuario', {
    id_uni : {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
}, {
    timestamps: true
})

let relacion = {
    foreignKey: {
        name: 'id_uni',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
};

Presupuesto.hasMany(CostoAdministrativo, relacion);
CostoAdministrativo.belongsTo(Presupuesto, relacion);


module.exports = universidad