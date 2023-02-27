const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExp } = require("../Configs");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExp,
  });

  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = { createJWT, isTokenValid };
