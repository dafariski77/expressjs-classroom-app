const { StatusCodes } = require("http-status-codes");
const {
  getOneUser,
  updateProfile,
  updatePassword,
} = require("../Services/user.service");

const find = async (req, res, next) => {
  try {
    const result = await getOneUser(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const result = await updateProfile(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const editPassword = async (req, res, next) => {
  try {
    const result = await updatePassword(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { find, edit, editPassword };
