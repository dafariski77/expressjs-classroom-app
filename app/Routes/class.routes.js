const express = require("express");
const router = express();
const {
  find,
  create,
  index,
  update,
  destroy,
} = require("../Controllers/class.controllers");

router.get("/class/:id", find);
router.post("/class", create);
router.get("/class", index);
router.put("/class/:id", update);
router.delete("/class/:id", destroy);

module.exports = router;
