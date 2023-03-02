const { StatusCodes } = require("http-status-codes");
const { createFile } = require("../Services/file.service");

const create = async (req, res, next) => {
  try {
    const result = await createFile(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { create };
