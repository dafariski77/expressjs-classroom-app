const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  description: {
    type: String,
  },
  file: {
    type: mongoose.Types.ObjectId,
    ref: "File",
  },
  deadline: {
    type: Date,
  },
  submitted: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      answer: {
        type: mongoose.Types.ObjectId,
        ref: "File",
      },
    },
  ],
  className: {
    type: mongoose.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
