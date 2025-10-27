const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/User");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat@kohli.com",
    password: "virat123",
  });

  try {
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.status(400).send("Error registering user: ", +err.message);
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB Connection Established");
    app.listen(7777, () => console.log("Server is running on port 7777"));
  })
  .catch((err) => console.error("MongoDB Connection Error:"));
