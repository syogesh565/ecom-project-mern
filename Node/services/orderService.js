// services/orderService.js
const Order = require("../models/Order");
const User = require("../models/User");

// services/orderService.js
async function getOrdersByUserId(userId) {
    try {
      const user = await User.findByPk(userId, { include: [{ model: Order, as: 'orders' }] });
  
      if (user) {
        return user.orders;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
  
module.exports = { getOrdersByUserId };
