const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  //Read the token from the req cookies
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid token!!!!!");
    }

    const decodedObj = jwt.verify(token, "my@secretKey");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not Found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
  //Validate the token
  //Find the user
};

module.exports = {
  userAuth,
};
