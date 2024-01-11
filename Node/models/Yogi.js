//yogi model code
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },

  price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed (total digits, decimal places)
    allowNull: false,
  },
  imagePath: {
    type: DataTypes.STRING, // Adjust the data type as needed (VARCHAR, TEXT, etc.)
    allowNull: true, // Depending on your requirements
  },
});

module.exports = Item;
