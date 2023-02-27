const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDB: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXP,
};
