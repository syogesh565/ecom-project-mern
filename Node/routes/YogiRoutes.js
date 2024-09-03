const express = require('express');
const router = express.Router();
const yogiController = require('../controllers/YogiController');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.').pop()}`);
  },
});

const upload = multer({ storage }).single('image');

// GET all items
router.get('/', yogiController.getAllItems);

// GET a specific item by ID
router.get('/:id', yogiController.getItemById);

// Create a new item with image upload
router.post('/', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, yogiController.createItem);

// Update an item by ID
router.put('/:id', yogiController.updateItem);

// Delete an item by ID
router.delete('/:id', yogiController.deleteItem);

module.exports = router;
