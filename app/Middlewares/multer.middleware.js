const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, "public/uploads/images/");
    } else {
      cb(null, "public/uploads/docs/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 999999999) + "-" + file.originalname);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploadMiddleware;
