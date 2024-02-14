const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
// const twilioController = require('../controllers/twilioController'); // Import Twilio controller
const twilio = require('twilio');
const generateOtp = require('generate-otp');

const accountSid = 'AC3ea2ecb94fea80860f24536acd04274b';
const authToken = 'f0c48150fc8a8a0562ced78a8c5f9071';
const verifySid = 'VA14af70a29ed6c3759c5a102c798c5b86';
const client = twilio(accountSid, authToken);
// Create router object

// Define login route
router.post("/login", loginController.login);



// Define logout route
router.post("/logout", loginController.logout);

// Export router object
module.exports = router;
