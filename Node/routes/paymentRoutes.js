const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST method to create a payment intent
router.post('/create-payment-intent', paymentController.createPaymentIntent);

module.exports = router;

