const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // find All user for get all data
    res.json(users);
  } catch (err) {
    // 400  crash 401 402 403 500 mewt9ork eroor  not foun404  200 success  201 hald succes 
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// POST method

exports.createUser = async (req, res) => {
  try {
    const {username, email, password } = req.body;
       // Check if username or email already exists in the database
    // const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    // if (existingUser) {
    //   return res.status(400).json({ message: 'Username or email already exists' });
    // }
    const newUser = await User.create({ username, email, password: password });
    res.status(201).json({message: 'User registered successfully!',newUser});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// put post 
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = await User.findByPk(id);
    console.log(user);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    await User.update({ username, email }, { where: { id } });
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// post hotaa
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    await User.destroy({ where: { id } });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
