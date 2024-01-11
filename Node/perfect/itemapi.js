//yogi model code
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Item;

//yogi controller code
const Item = require('../models/Yogi');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
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
      res.status(404).json({ message: 'yogi not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem = await Item.create({ name, description });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const item = await Item.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    await Item.update({ name, description }, { where: { id } });
    res.json({ message: ' Item updated successfully' });
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
    await Item.destroy({ where: { id } });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//yogi router code

const express = require('express');
const router = express.Router();
const yogiController = require('../controllers/YogiController');

// GET all items
router.get('/', yogiController.getAllItems);

// GET a specific item by ID
router.get('/:id', yogiController.getItemById);

// Create a new item
router.post('/', yogiController.createItem);

// Update an item by ID
router.put('/:id', yogiController.updateItem);

// Delete an item by ID
router.delete('/:id', yogiController.deleteItem);

module.exports = router;
