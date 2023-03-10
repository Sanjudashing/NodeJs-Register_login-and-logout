const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header["Authorization"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const verifyUser = jwt.verify(token, process.env.API_KEY);
    console.log(verifyUser);
  } catch (error) {
    res.status(500).send(error);
  }
  return next();
};
module.exports = auth;
