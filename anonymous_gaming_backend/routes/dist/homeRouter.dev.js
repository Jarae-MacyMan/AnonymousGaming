"use strict";

var express = require('express');

var router = express.Router();

var homeController = require('../controller/homeController');

var authCheck = require('../middleware/checkAuth'); //
//console.log(pool)
//Get all questions


router.get("/", authCheck, homeController.getHome); //Get all comments for a post

router.get("/posts/:id", homeController.getHomeComments); //comment on a post

router.post("/post/:id", homeController.postHomeComments); //create a post

router.post("/post", homeController.createHomePosts); //like a post
//router.post("/like",  async (req, res) => {})

module.exports = router;