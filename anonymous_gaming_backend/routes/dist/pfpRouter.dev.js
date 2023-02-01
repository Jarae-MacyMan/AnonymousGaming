"use strict";

var express = require('express');

var router = express.Router();

var pfpController = require('../controller/pfpController');

router.post('/', pfpController.createPfp);
module.exports = router;