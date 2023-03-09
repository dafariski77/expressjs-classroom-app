const bcrypt = require("bcryptjs");
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../Errors");
const UserModel = require("../Models/user.model");

const getOneUser = async (req) => {
  const { id } = req.params;

  const result = await UserModel.findOne({
    _id: id,
  });

  if (!result) {
    throw new NotFoundError("User not found!");
  }

  return result;
};

const updateProfile = async (req) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const result = await UserModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new NotFoundError("User not found!");
  }

  return result;
};

const updatePassword = async (req) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await UserModel.findOne({ _id: id });
  if (!user) {
    throw new NotFoundError("User not found!");
  }

  const checkPassword = await user.comparePassword(oldPassword);
  if (!checkPassword) {
    throw new UnauthorizedError("Old password incorrect!");
  }

  if (newPassword !== confirmPassword) {
    throw new BadRequestError("Incorrect Password!");
  }

  const hashPassword = await bcrypt.hash(newPassword, 12);
  const result = await UserModel.findOneAndUpdate(
    {
      _id: id,
    },
    { password: hashPassword },
    { new: true, runValidators: true }
  );

  return result;
};

module.exports = { getOneUser, updateProfile, updatePassword };
