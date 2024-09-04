const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');
const orderService = require('../services/orderService');



// GET all users
router.get('/users', userController.getAllUsers);

// GET a specific user by ID
router.get('/users/:id', userController.getUserById);

// Create a new user
router.post('/users', userController.createUser);

// Update a user by ID
router.put('/users/:id', userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUser);

// GET orders for a specific user by username
router.get('/users/:userId/orders', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orders = await orderService.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders by userId:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
