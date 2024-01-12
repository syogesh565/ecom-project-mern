// controllers/orderController.js
const Order = require('../models/Order');

// Save the ordered items to the database
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // Process the items and save them to the database
    const order = await Order.create({ items });

    // Respond with the order details
    res.json({ success: true, orderId: order.id, orderItems: order.items });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = { createOrder };


// // controllers/orderController.js
// const Order = require('../models/Order');

// // Example: Save the ordered items to the database
// const createOrder = async (orderedItems) => {
//   try {
//     // Extract only the "name" property from each item
//     const extractedNames = orderedItems.map(item => item.name);

//     // Process the extracted names and save them to the database
//     const order = await Order.create({ items: extractedNames });

//     return { success: true, orderId: order.id };
//   } catch (error) {
//     console.error('Error creating order:', error);
//     return { success: false, error: 'Internal Server Error' };
//   }
// };

// module.exports = { createOrder };
