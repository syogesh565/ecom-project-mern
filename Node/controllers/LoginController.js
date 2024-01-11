
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = 'SHUBAHM_SONI'; // or use process.env.SECRET
// Import dotenv module


// Define login function
exports.login = async (req, res) => {
  try {
    // Get username and password from request body
    const { email, password } = req.body;

    // Find user by username using Sequelize
    const user = await User.findOne({ where: { email } });

    // If user not found, send error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(password,'',user.password)
    // Compare password with hashed password using bcrypt
    const match = await bcrypt.compare(password,user.password);
    // console.log(match,'==lkya hua')
    // If password does not match, send error response
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token using jwt.sign
    const token = jwt.sign({ id: user.id }, secret);

    // Set cookie with token using res.cookie
    res.cookie("token", token, { httpOnly: true });

    // Send success response
    res.json({ message: "Login successful" ,data:{token:token,userInfo: user},status:200});
  } catch (error) {
    // Send error response
    res.status(500).json({ message: error.message });
  }
};

// Define logout function
exports.logout = (req, res) => {
  try {
    // Clear cookie with token using res.clearCookie
    res.clearCookie("token");

    // Send success response
    res.json({ message: "Logout successful" });
  } catch (error) {
    // Send error response
    res.status(500).json({ message: error.message });
  }
};
