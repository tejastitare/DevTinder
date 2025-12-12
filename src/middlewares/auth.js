const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  //Read the token from the req cookies
  try {
    const token =
      (req.cookies && req.cookies.token) ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      res.status(401).send("You are not logged in");
    }
    let decodedObj;
    try {
      decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // invalid/expired token
      console.error("JWT verify error:", err.message);
      return res.status(401).send("Invalid token");
    }
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not Found");
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(400).send("Error : " + error.message);
  }
};

module.exports = {
  userAuth,
};
