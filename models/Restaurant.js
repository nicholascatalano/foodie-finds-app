const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Restaurant extends Model {}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // cuisine: {
    //   type: DataTypes.JSON,
    //   allowNull: true,
    // },
    // sub_categories: {
    //   type: DataTypes.JSON,
    //   allowNull: true,
    // },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'restaurant',
  }
);

module.exports = Restaurant;
