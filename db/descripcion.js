const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('./conexion')
const usuario = require('./usuario')

//Definicion del modelo de usuario
const usuario_desc = sequelize.define('descripciones', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    nacimiento_user: {
        type: DataTypes.DATE,
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

let relacion = {
    foreignKey: {
        name: 'id_user',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
};

usuario.hasMany(usuario_desc, relacion);
usuario_desc.belongsTo(usuario, relacion);

module.exports = usuario_desc