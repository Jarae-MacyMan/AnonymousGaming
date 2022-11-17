"use strict";

var express = require('express');

var router = express.Router();

var pool = require('../dbconfig');

var homeController = require('../controller/homeController'); //
//console.log(pool)
//Get all questions


router.get("/", homeController.getHome); // //Get all comments for a post
// router.get("/comments/:id",  async (req, res) => {
//     const { id } = req.params;
//     const comments = await pool.query(
//       "SELECT * FROM comments WHERE posts_id = $1",
//       [id]
//     );
//     //cant insert empty str
//     if (comments.rows.length !== 0) {
//       res.json(answers.rows);
//     }
// });
// //Get all comments
// router.get("/comments", async (req, res) => {
//   //try {
//     const comments = await pool.query("SELECT * FROM comments INNER JOIN users ON comments.user_id = users.user_id ORDER by comments.comments_id DESC")
//     res.json(comments.rows)
// })
// //post a comment
// router.post("/comments/:id",  async (req, res) => {
//     const user_id = req.user;
//     const { comment } = req.body;
//     const { id } = req.params;
//     const postComment = await pool.query(
//       "INSERT INTO comments (content, posts_id, user_id) VALUES($1, $2, $3) RETURNING *",
//       [comment, id, user_id],
//     );
//     const allComments = await pool.query("SELECT * FROM comments JOIN users ON comments.user_id = users.user_id ORDER BY comments.comments_id DESC")
//     console.log(allComments)
//     res.json(allComments.rows);
// });
//like a post
//router.post("/like",  async (req, res) => {})

module.exports = router;