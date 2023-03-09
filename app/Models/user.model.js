const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide a email!"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
    },
    joinedClass: [
      {
        class: {
          type: mongoose.Types.ObjectId,
          ref: "Class",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "non active"],
      default: "non active",
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
