const jwt = require("jsonwebtoken");
const JWT_SECRET = "YEUI^*&^#@!@#";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token; // if using thunder client you need to add token in the header manually
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json("Access Token not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(400).json("Access Token not avaliable");
  }
};

module.exports = { verifyToken };
