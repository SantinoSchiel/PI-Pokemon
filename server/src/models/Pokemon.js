const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Pokemon = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
   },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
   },
   hp: {
    type: DataTypes.INTEGER,
    allowNull: false
   },
   attack: {
    type: DataTypes.INTEGER,
    allowNull: false
   },
   defense: {
    type: DataTypes.INTEGER,
    allowNull: false
   },
   speed: {
    type: DataTypes.INTEGER,
    allowNull: true
   },
   height: {
    type: DataTypes.INTEGER,
    allowNull: true
   },
   weight: {
    type: DataTypes.INTEGER,
    allowNull: true
   },
  }, { timestamps: false });
};

module.exports = Pokemon;