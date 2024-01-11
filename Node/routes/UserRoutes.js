const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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

module.exports = router;
