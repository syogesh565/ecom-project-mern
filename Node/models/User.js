const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
const Order = require('./Order'); // Import the Order model
const User = sequelize.define('users', {
   userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   isEmail: true,
    // },
  },
  password: {
    type: DataTypes.STRING, // Change the data type based on your security requirements
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'pending'), // Adjust status values as needed
    defaultValue: 'pending',
  },
  // Add other fields as needed
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }
    },
  },
});

// Establish a relationship between User and Order
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
