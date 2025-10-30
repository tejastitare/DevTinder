const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestsRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    //Sending the connection request
    res.send(user.firstName + "Sent the connection request!");
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

module.exports = requestsRouter;
