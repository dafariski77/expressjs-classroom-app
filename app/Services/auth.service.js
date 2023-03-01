const { BadRequestError, UnauthorizedError } = require("../Errors");
const Users = require("../Models/user.model");
const { createJWT, createToken, createRefreshJWT } = require("../Utils");
const { createUserRefreshToken } = require("./refreshToken.service");

const signUpUser = async (req) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password and Confirmation Password not valid!");
  }

  const result = await Users.create({
    name,
    email,
    password,
  });

  return result;
};

const signInUser = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result = await Users.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
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

module.exports = { signUpUser, signInUser };
