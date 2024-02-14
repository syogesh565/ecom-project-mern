// twilioController.js

const accountSid = "AC3ea2ecb94fea80860f24536acd04274b";
const authToken = "f0c48150fc8a8a0562ced78a8c5f9071";
const verifySid = "VA14af70a29ed6c3759c5a102c798c5b86";
const client = require("twilio")(accountSid, authToken);

exports.sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const verification = await client.verify.services(verifySid)
      .verifications.create({ to: `+91${phoneNumber}`, channel: "sms" });

    res.json({ status: verification.status });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    const verification_check = await client.verify
      .services(verifySid)
      .verificationChecks.create({ to: `+91${phoneNumber}`, code });

    res.json({ status: verification_check.status });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
