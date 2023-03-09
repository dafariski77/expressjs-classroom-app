const { UnauthenticatedError } = require("../Errors");
const { isTokenValid } = require("../Utils");

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authentication Invalid!");
    }

    const payload = isTokenValid({ token });

    req.user = {
      email: payload.email,
      name: payload.name,
      id: payload.userId,
    };

    next();
  } catch (err) {
    next(err);
  }
};

// const checkingRole = () => {

// }
