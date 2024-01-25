const multer = require('multer');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder for uploaded files
    cb(null, 'uploads'); // Change 'uploads' to your desired folder
  },
  filename: (req, file, cb) => {
    // Define how the file should be named
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to restrict the types of files allowed (e.g., only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('File type not supported'), false); // Reject the file
  }
};

// Initialize Multer with the storage and file filter configurations
const upload = multer({ storage, fileFilter });

// Middleware function for handling file uploads
const uploadFile = upload.single('image'); // 'image' should match the field name in the form

module.exports = uploadFile;
