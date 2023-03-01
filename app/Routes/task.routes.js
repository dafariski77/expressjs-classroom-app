const express = require("express");
const router = express();
const {
  create,
  index,
  find,
  update,
  destroy,
} = require("../Controllers/task.controller");

router.get("/task", index);
router.post("/task", create);
router.get("/task/:id", find);
router.put("/task/:id", update);
router.delete("/task/:id", destroy);

module.exports = router;
