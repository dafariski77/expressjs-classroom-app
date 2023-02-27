const { StatusCodes } = require("http-status-codes");
const { getOneUser } = require("../Services/user.service");

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

module.exports = { find };
