"use strict";

var express = require('express');

var router = express.Router();

var chatController = require('../controller/chatController.js');

var authCheck = require('../middleware/checkAuth');

router.get("/", chatController.addMessage);
router.post("/chatId", chatController.getMessages);
module.exports = router;