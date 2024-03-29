const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Type = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
     },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  }, { timestamps: false });
};

module.exports = Type;