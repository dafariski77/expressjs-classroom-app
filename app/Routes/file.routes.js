const express = require("express");
const { create } = require("../Controllers/file.controller");
const router = express();
const upload = require("../Middlewares/multer.middleware");

router.post("/file", upload.single("file"),create);

module.exports = router;
