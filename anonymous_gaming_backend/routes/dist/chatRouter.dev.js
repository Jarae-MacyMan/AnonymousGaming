"use strict";

var express = require('express');

var router = express.Router();

var chatController = require('../controller/chatController.js');

var authCheck = require('../middleware/checkAuth');

router.get("/:userId", chatController.allUserChats);
router.get('/find/:firstId/:secondId', chatController.findChat);
router.post("/createChatRoom", chatController.createChatRoom);
module.exports = router;