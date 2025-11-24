const express = require('express');
const chatRouter = express.Router();
const Chat = require("../models/Chat");
const {userAuth} = require("../middlewares/auth");

chatRouter.get("/chat/:targetUserId",userAuth,async(req,res)=>{
    try {
        const {targetUserId} = req.params;
        const userId = req.user._id;
        let chat = await Chat.findOne({participants:{$all:[userId,targetUserId]}}).populate({
            path:"messages.senderId",
            select:"firstName lastName"
        })
        if(!chat){
            chat = new Chat({participants:[userId,targetUserId],messages:[]});
            await chat.save();
        }
        res.json(chat);
    } catch (error) {
        res.json({message:error.message})
    }
})


module.exports = chatRouter;