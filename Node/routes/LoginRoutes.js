const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Create router object

// Define login route
router.post("/login", loginController.login);

// Define logout route
router.post("/logout", loginController.logout);

// Export router object
module.exports = router;
