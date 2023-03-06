const express = require('express')
const router = express.Router()
const chatController = require('../controller/chatController.js')
const authCheck = require('../middleware/checkAuth');

router.get("/", chatController.addMessage)
router.post("/chatId", chatController.getMessages)


module.exports = router;