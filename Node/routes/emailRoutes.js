// emailRoutes.js
const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/EmailController');

router.post('/send-email', EmailController.sendEmail);

module.exports = router;
