const express = require("express");
const { createChat, userChats, findChat } = require("../controller/chatControllers");
const { authenticateToken } = require("../middleware/userAuth");

const chatRouter = express.Router()

chatRouter.post('/',authenticateToken, createChat);
chatRouter.get('/:userId',userChats);
chatRouter.get('/find/:firstId/:secondId',authenticateToken,  findChat);

module.exports = chatRouter;