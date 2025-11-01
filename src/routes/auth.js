const express = require("express");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    //Validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //Creating new instance of User model with provided data
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    // const user = new User({
    //   firstName: "Virat",
    //   lastName: "Kohli",
    //   emailId: "virat@kohli.com",
    //   password: "virat123",
    // });

    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).send("Error registering user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.passwordValidator(password);
    if (isPasswordValid) {
      const token = user.getJWT();
      res.cookie("token", token);

      res.send(user +" User logged in successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error logging user: " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User logged out successfully");
});

module.exports = authRouter;
