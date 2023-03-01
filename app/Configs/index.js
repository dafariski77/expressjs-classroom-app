const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDB: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXP,
  jwtRefreshTokenSecret: process.env.JWT_SECRET_REFRESH_TOKEN,
  jwtRefreshTokenExp: process.env.JWT_EXP_REFRESH_TOKEN,
};
