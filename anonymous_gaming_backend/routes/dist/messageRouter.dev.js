"use strict";

var express = require('express');

var router = express.Router();

var messageController = require('../controller/messageController.js');

var authCheck = require('../middleware/checkAuth');

router.post("/", authCheck, messageController.addMessage);
router.get("/:chatId", authCheck, messageController.getMessages);
module.exports = router;