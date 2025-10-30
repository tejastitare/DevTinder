const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { ValidateForgotPasswordData } = require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    const data = req.body;
    Object.keys(data).forEach((key) => (loggedInUser[key] = data[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

profileRouter.patch("/profile/forgotpassword", async (req, res) => {
  try {
    ValidateForgotPasswordData(req);

    const { emailId, newpassword } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Pleased Signup first!");
    }

    const newHashPassword = await bcrypt.hash(newpassword, 10);
    user.password = newHashPassword;
    const token = user.getJWT();
    res.cookie("token", token);

    await user.save();
    res.send(`${user.firstName}, Your Password updated successfully`);
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

module.exports = profileRouter;
