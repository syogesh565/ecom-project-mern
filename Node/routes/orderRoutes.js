// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


// POST request to create an order
router.post('/create-order', orderController.createOrder);

// GET request to retrieve orders
router.get('/get-orders', orderController.getOrders);

module.exports = router;
