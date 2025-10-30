const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status type " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found" });
      }
      //If there is an existence connectionRequest
      const existenceConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existenceConnectionRequest) {
        return res
          .status(400)
          .json({ message: "You have already sent a request to this user" });
      }
      
      const ConnectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await ConnectionRequest.save();

      res.json({
        message:req.user.firstName+" is "+ status +" in "+ toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("Error :" + error.message);
    }
  }
);

module.exports = requestsRouter;
