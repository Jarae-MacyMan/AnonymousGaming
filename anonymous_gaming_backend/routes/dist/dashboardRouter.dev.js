"use strict";

var express = require('express');

var router = express.Router();

var dashboardController = require('../controller/dashboardController.js');

var authCheck = require('../middleware/checkAuth'); //get user info and posts


router.get("/", authCheck, dashboardController.getUsers); //get comments for a post

router.get("/posts/:id", dashboardController.getComments); //create a post

router.post("/", authCheck, dashboardController.createPost); //delete a post

router["delete"]("/posts/:id", dashboardController.deletePost); // //Update profile info
// router.put("/", authCheck, dashboardController.editInfo)
//edit profile

router.put("/edit", authCheck, dashboardController.editProfile); //edit profile pic
//router.put("/editpic", authCheck, homeController.editProfilePic)

module.exports = router;