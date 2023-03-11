const express = require('express')
const router = express.Router()
const messageController = require('../controller/messageController.js')
const authCheck = require('../middleware/checkAuth');

router.post("/", authCheck, messageController.addMessage)
router.get("/:chatId",authCheck ,messageController.getMessages)


module.exports = router;