const express = require("express");

const app = express();

app.get("/getUserData", (req, res, next) => {
//   try {
    throw new Error("An error occurred!");
    res.send("User data Sent");
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong!");
  }

});
app.listen(7777, () => console.log("Server is running on port 7777"));
