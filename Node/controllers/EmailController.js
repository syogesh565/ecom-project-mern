// EmailController.js
const EmailModel = require('../models/EmailModel');

class EmailController {
  static async sendEmail(req, res) {
    const { to, subject, html } = req.body;

    try {
      const result = await EmailModel.sendEmail(to, subject, html);
      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = EmailController;
