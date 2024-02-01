// controllers/orderController.js
const Order = require('../models/Order');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
// Save the ordered items to the database
const createOrder = async (req, res) => {
  try {
    const { userId, username, items } = req.body;

      // Process the items and save them to the database
      const createdOrders = await Promise.all(items.map(async item => {
        const createdOrder = await Order.create({
          name: item.name,
          quantity: item.quantity,
          userId: userId, // Include userId in the Order entry
          username: username, // Include username in the Order entry
        });
  
        return {
          orderId: createdOrder.id, // Assuming your Order model has an 'id' field
          orderItems: {
            name: createdOrder.name,
            quantity: createdOrder.quantity,
          },
        };
      }));
  
      // Respond with the success message and order details
      res.json({ success: true, message: 'Order saved successfully', orders: createdOrders });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = { createOrder, getOrders };
