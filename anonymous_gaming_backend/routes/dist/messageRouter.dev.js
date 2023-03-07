"use strict";

var express = require('express');

var router = express.Router();

var messageController = require('../controller/messageController.js');

var authCheck = require('../middleware/checkAuth');

router.post("/", messageController.addMessage);
router.get("/:chatId", messageController.getMessages);
module.exports = router;