// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  // Define your Order model properties here
  // For example, you may want to store user information and ordered items
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
  items: {
    type: DataTypes.JSON, // Assuming you want to store ordered items as JSON
    allowNull: false,
  },
});

module.exports = Order;
