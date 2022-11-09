const express = require('express')
const postController = require("../controller/postController");
const router = express.Router()

router.get("/", postController.getPosts);

router.get("/:id", postController.getSinglePost);

router.post("/", postController.createPost);

//router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

// router.get("/:id/comments", CommentsController.getCommentsOfBlog);

// router.post("/:id/comments", CommentsController.createCommentOfBlog);


module.exports = router
