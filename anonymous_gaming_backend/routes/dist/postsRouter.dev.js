"use strict";

var express = require('express');

var router = express.Router();

var postController = require("../controller/postController");

router.get("/", postController.getPosts);
router.get("/:id", postController.getSinglePost);
router.post("/", postController.createPost); //router.put("/:id", postController.updatePost);

router["delete"]("/:id", postController.deletePost); // router.get("/:id/comments", CommentsController.getCommentsOfBlog);
// router.post("/:id/comments", CommentsController.createCommentOfBlog);

module.exports = router;