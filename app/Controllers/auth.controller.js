const { StatusCodes } = require("http-status-codes");
const {
  signUpUser,
  signInUser,
  activateUser,
} = require("../Services/auth.service");

const signUp = async (req, res, next) => {
  try {
    const result = await signUpUser(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const activeUser = async (req, res, next) => {
  try {
    const result = await activateUser(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const result = await signInUser(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signIn, activeUser };
