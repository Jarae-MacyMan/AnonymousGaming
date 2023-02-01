const express = require('express')
const router = express.Router()
const pfpController = require('../controller/pfpController')

router.post('/', pfpController.createPfp)


module.exports = router
