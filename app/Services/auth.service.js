const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../Errors");
const UserModel = require("../Models/user.model");
const { createJWT, createToken, createRefreshJWT } = require("../Utils");
const { otpMail } = require("./mail");
const { createUserRefreshToken } = require("./refreshToken.service");

const signUpUser = async (req) => {
  const { name, email, password, confirmPassword } = req.body;

  let result = await UserModel.findOne({
    email,
    status: "non active",
  });

  if (password !== confirmPassword) {
    throw new BadRequestError("Password and Confirmation Password not valid!");
  }

  if (result) {
    result.name = name;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await UserModel.create({
      name,
      email,
      password,
      otp: Math.floor(Math.random() * 9999),
    });
  }

  await otpMail(email, result);

  delete result._doc.password;

  return result;
};

const activateUser = async (req) => {
  const { otp, email } = req.body;
  const check = await UserModel.findOne({ email });

  if (!check) {
    throw new NotFoundError("User not registered!");
  }

  if (check && check.otp !== otp) {
    throw new BadRequestError("Invalid OTP code!");
  }

  const result = await UserModel.findByIdAndUpdate(
    check._id,
    {
      status: "active",
    },
    {
      new: true,
    }
  );

  delete result._doc.password;

  return result;
};

const signInUser = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result = await UserModel.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  if (result.status === "non active") {
    throw new UnauthorizedError("Account not activated!");
  }

  const checkPassword = await result.comparePassword(password);

  if (!checkPassword) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = createJWT({ payload: createToken(result) });
  const refreshToken = createRefreshJWT({ payload: createToken(result) });

  await createUserRefreshToken({
    refreshToken,
    user: result._id,
  });

  return { token, refreshToken, email: result.email };
};

module.exports = { signUpUser, signInUser, activateUser };
