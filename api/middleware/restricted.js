const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({ message: "access not authorized" });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(400).json("token invalid");
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = restricted;
