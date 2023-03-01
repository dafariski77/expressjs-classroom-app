const express = require("express");
const router = express();
const { signUp, signIn } = require("../Controllers/auth.controller");

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);

module.exports = router;
