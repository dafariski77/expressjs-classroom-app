const Users = require("../Models/user.model");
const RefreshToken = require("../Models/refreshToken.model");
const { NotFoundError } = require("../Errors");
const { isRefreshTokenValid, createJWT, createToken } = require("../Utils");

const createUserRefreshToken = async (payload) => {
  const result = await RefreshToken.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;
  const result = await RefreshToken.findOne({
    refreshToken,
  });

  if (!result) {
    throw new NotFoundError("Invalid Refresh Token");
  }

  const payload = isRefreshTokenValid({ token: result.refreshToken });

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createToken(userCheck) });

  return token;
};

module.exports = {
  createUserRefreshToken,
  getUserRefreshToken,
};
