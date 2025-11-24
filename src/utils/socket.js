const socketIO = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/Chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  const room = [userId, targetUserId].sort().join("_");
  return crypto.createHash("sha256").update(room).digest("hex");
};

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  // Handles Events
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName + " joined room " + roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName,lastName, userId, targetUserId, text }) => {
        //Save message to the database
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + ": " + text);

          // Check if userId and targetUserId are friends

          const connection = ConnectionRequest.findOne({fromUserId:userId,toUserId:targetUserId,status:"accepted"});

          if(!connection){
            console.log("You Can Chat Only With The Friends");
          }

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({ senderId: userId, text });
          await chat.save();

          io.to(roomId).emit("MessageReceived", { firstName,lastName, text });
        } catch (error) {
          console.log("Error:" + error);
        }
      } 
    );
  });
};

module.exports = initializeSocket;
