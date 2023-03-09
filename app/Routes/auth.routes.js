const express = require("express");
const router = express();
const {
  signUp,
  signIn,
  activeUser,
} = require("../Controllers/auth.controller");

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/activate", activeUser);

module.exports = router;
