const express = require('express')
const router = express.Router()
const friendController = require('../controller/friendController.js')
const authCheck = require('../middleware/checkAuth');

router.post("/send", authCheck, friendController.sendFriendReq)

// router.post("/", authCheck, friendController.receiveFriendReq)

// router.post("/", authCheck, friendController.acceptFriendReq)

// router.post("/", authCheck, friendController.getfriend)


module.exports = router;
