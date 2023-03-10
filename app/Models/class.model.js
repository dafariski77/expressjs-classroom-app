const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a class name!"],
    },
    description: {
      type: String,
    },
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
    },
    code: {
      type: Number,
      default: Math.floor(100000 + Math.random() * 900000),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Class", classSchema);
