const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error logging user: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    //Sending the connection request
    res.send(user.firstName + "Sent the connection request!");
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB Connection Established");
    app.listen(7777, () => console.log("Server is running on port 7777"));
  })
  .catch((err) => console.error("MongoDB Connection Error:"));
