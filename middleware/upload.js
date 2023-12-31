const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // set file name
  }
});

// storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
