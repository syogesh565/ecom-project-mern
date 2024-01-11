const Item = require('../models/Yogi');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where uploaded images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.').pop()}`);
  },
});

const upload = multer({ storage }).single('image');

exports.getAllItems = async (req, res) => {
  try {
    const { term } = req.query; // Assuming the search term is passed as a query parameter

    let items;
    if (term) {
      // If a search term is provided, filter items based on the term
      items = await Item.findAll({
        where: {
          // Your logic to filter items based on the name or description column
          [Op.or]: [
            { name: { [Op.like]: `%${term}%` } }, // Example search on 'name' column
            { description: { [Op.like]: `%${term}%` } }, // Example search on 'description' column
            { price: { [Op.like]: `%${term}%` } }, // Example search on 'description' column
          ],
        },
      });
    } else {
      // If no search term is provided, fetch all items
      items = await Item.findAll();
    }

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    // Destructure name, description, and image from req.body
      const { name, description, price, imagePath } = req.body;
      const newItem = await Item.create({ name, description, price, imagePath: req.file.path });
      res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description,price } = req.body;
    const item = await Item.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    await Item.update({ name, description, price }, { where: { id } });
    res.json({ message: 'Item updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
       // Delete image from uploads folder
    const imagePath = item.imagePath; // Assuming the field name in the model is 'imagePath'
    // const filePath = path.join('uploads', imagePath); // Path to the image
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        // Handle error (log or return response)
      }
      console.log('Image deleted successfully');
    });
    // await Item.findByIdAndDelete(id);
    await Item.destroy({ where: { id } });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
