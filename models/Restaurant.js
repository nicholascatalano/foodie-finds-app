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
    //   type: DataTypes.ARRAY(DataTypes.TEXT),
    //   allowNull: true,
    // },
    // sub_category: {
    //   type: DataTypes.ARRAY(DataTypes.TEXT),
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
