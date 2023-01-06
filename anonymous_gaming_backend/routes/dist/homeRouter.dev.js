"use strict";

var express = require('express');

var router = express.Router();

var homeController = require('../controller/homeController');

var authCheck = require('../middleware/checkAuth'); //
//console.log(pool)
//Get users info


router.get("/", authCheck, homeController.getUsers); //Get all posts

router.get("/posts", authCheck, homeController.getHome); //create a post

router.post("/post", authCheck, homeController.createHomePosts); //Get all comments for a post

router.get("/comments", authCheck, homeController.getHomeComments); //comment on a post

router.post("/post/:id", authCheck, homeController.postHomeComments); //get all comments
//like a post
//router.post("/like",  async (req, res) => {})

module.exports = router;