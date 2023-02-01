const pool = require('../dbconfig')
const homeModel = require("../models/homeModel");



class homeContoller {

    //get all users
    static async getUsers(req, res) {
        //console.log(req.user)
        try {
            const userData = await pool.query(
              "SELECT username, title, profile_pic_id FROM users WHERE user_id = $1",
              [req.user]
            );
            const userPosts = await pool.query(
              "SELECT * FROM posts JOIN users ON posts.user_id = users.user_id WHERE users.user_id = $1",
              [req.user]
            );
            const userInfo = {
              userData: userData.rows[0],
              userPosts: userPosts.rows,
            };
            res.json({ userInfo });
          } catch (error) {
            console.error(error);
            res.status(500).json("server error");
          }
    }
    

    //get all posts
    static async getHome(req, res) {
        const posts = await homeModel.getHomeFromDB();
        res.status(200).send(posts.rows);
    }
    //Get all comments for a post
    static async getHomeComments(req, res) {
        const posts_id = req.params.id
        const comments = await homeModel.getHomeCommentsFromDB(posts_id);
        if (comments.rows.length !== 0) {
            res.json(comments.rows);
        }
    }

    static async getHomeComment (req, res) {
        try {
          const comments = await pool.query("SELECT * FROM comments INNER JOIN users ON comments.user_id = users.user_id ORDER by comments.comments_id DESC")
          res.json(comments.rows)
        } catch (error) {
          console.error(error)
          res.status(500).json("server error")
        }
    }


    //comment on a post
    static async postHomeComments(req, res) {
        try {
            const user_id = req.user;
            const { comment } = req.body;
            const posts_id = req.params.id
            //const { id } = req.params;


            const postComment = await pool.query(
                "INSERT INTO comments (content, posts_id, user_id) VALUES($1, $2, $3) RETURNING *",
                [comment, posts_id, user_id],
            );
            
            const allComments = await pool.query("SELECT * FROM comments JOIN users ON comments.user_id = users.user_id ORDER BY comments.comments_id DESC")

            //console.log(allComments)
            res.json(allComments.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json("server error");
        }

        // if (allComments.rows.length !== 0) {
        //     res.json(allComments.rows);
        // }
    }

    static async createHomePosts(req, res) {
        try {
            const { post } = req.body;   
            const createPost = await pool.query(
                "INSERT INTO posts (content, user_id) VALUES ($1, $2) RETURNING *",
                [post, req.user]
              );
              res.json(createPost.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json("server error");
        }
        // const { user_id, content } = req.body;
        // const newPost = await homeModel.createPostFromDB(user_id, content);
        // return res.send(newPost.rows);
    }
}

module.exports = homeContoller;





