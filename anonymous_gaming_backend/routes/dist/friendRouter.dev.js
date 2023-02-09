"use strict";

var express = require('express');

var router = express.Router();

var friendController = require('../controller/friendController.js');

var authCheck = require('../middleware/checkAuth');

router.post("/send", authCheck, friendController.sendFriendReq);
router.get("/friendCheck/:userId/:otherUserId", authCheck, friendController.getFriendReq);
router.get("/received", authCheck, friendController.receiveFriendReq); // router.post("/", authCheck, friendController.acceptFriendReq)
// router.post("/", authCheck, friendController.getfriend)

module.exports = router;