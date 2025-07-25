// middleware to check if the user is authenticated
const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log({ authHeader });
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });

    req.userId = decoded.userId;
    next();
  });
};
