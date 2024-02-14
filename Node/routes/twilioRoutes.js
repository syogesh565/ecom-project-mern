// twilioRoutes.js

const express = require('express');
const router = express.Router();
const twilioController = require('../controllers/twilioController');

// Route to send OTP
router.post('/send-otp', twilioController.sendOTP);

// Route to verify OTP
router.post('/verify-otp', twilioController.verifyOTP);

module.exports = router;
