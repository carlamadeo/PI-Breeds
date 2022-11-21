const { DataTypes } = require('sequelize');
const { toPascalCase } = require('../utils');

module.exports = (sequelize) => {
  sequelize.define('Temperament', {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set(value) {
        this.setDataValue('name', toPascalCase(value));
      },
      validate: {
        notNull: {
          msg: `Name can't be empty`
        }
      }
    }
  }, {
    timestamps: false
  })
}