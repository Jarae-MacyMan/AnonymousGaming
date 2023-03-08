const express = require('express')
const router = express.Router()
const chatController = require('../controller/chatController.js')
const authCheck = require('../middleware/checkAuth');

router.get("/allChats", authCheck, chatController.allUserChats)
router.get('/find/:firstId/:secondId', chatController.findChat)
router.post("/createChatRoom", chatController.createChatRoom)


module.exports = router;
