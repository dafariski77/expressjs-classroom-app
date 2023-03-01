const jwt = require("jsonwebtoken");
const {
  jwtSecret,
  jwtExp,
  jwtRefreshTokenSecret,
  jwtRefreshTokenExp,
} = require("../Configs");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExp,
  });

  return token;
};

const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtRefreshTokenSecret, {
    expiresIn: jwtRefreshTokenExp,
  });

  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

const isRefreshTokenValid = ({ token }) =>
  jwt.verify(token, jwtRefreshTokenSecret);

module.exports = {
  createJWT,
  isTokenValid,
  createRefreshJWT,
  isRefreshTokenValid,
};
