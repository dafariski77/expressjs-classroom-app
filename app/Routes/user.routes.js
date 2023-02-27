const express = require("express");
const { find } = require("../Controllers/user.controller");
const router = express();

router.get("/user/:id", find);

module.exports = router;
