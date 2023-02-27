const { NotFoundError } = require("../Errors");
const Users = require("../Models/user.model");

const getOneUser = async (req) => {
  const { id } = req.params;

  const result = await Users.findOne({
    _id: id,
  });

  if (!result) {
    throw new NotFoundError("User not found!");
  }

  return result;
};

module.exports = { getOneUser };
