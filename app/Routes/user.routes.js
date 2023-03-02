const express = require("express");
const { find, edit, editPassword } = require("../Controllers/user.controller");
const router = express();

router.get("/user/:id", find);
router.put("/user/:id", edit);
router.put("/user/edit-password/:id", editPassword);

module.exports = router;
