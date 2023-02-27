const express = require("express");
const { signUp, signIn } = require("../Controllers/auth.controller");
const router = express();

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);

module.exports = router;
