// EmailModel.js
const nodemailer = require('nodemailer');

class EmailModel {
  static async sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'syogesh565@gmail.com',
        pass: 'jtap hmej udyb rwar',
      },
    });

    const mailOptions = {
      from: '"Yogesh Sharma"',
      to,
      subject,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, message: 'Error sending email' };
    }
  }
}

module.exports = EmailModel;
