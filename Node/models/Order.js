// // models/Order.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Order = sequelize.define('Order', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   quantity: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Order;


const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Order extends Model {}

Order.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
 
}, {
  sequelize,
  modelName: 'Order',
});

module.exports = Order;
