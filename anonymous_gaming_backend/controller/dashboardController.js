const pool = require('../dbconfig')


class dashboardContoller {

    //get user info and posts
    static async getUsers(req, res) {

        console.log(req.user) //comes from auth header
        try {
            const userData = await pool.query(
              "SELECT username, title, profile_pic FROM users WHERE user_id = $1",
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

    //Get all commments form a post 
    static async getComments (req, res){
        try {
        const { id } = req.params;
        const comments = await pool.query(
            "SELECT * FROM comments WHERE posts_id = $1",
            [id]
        );
        if (comments.rows.length !== 0) {
            res.json(comments.rows);
        }
        } catch (error) {
        console.error(error);
        res.status(500).json("server error");
        }
    }

    //Post a question
    static async createPost (req, res)  {
        try {
        console.log(req.body)
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
    }

    //Delete a post
    static async deletePost(req, res) {
    try {
      //const posts_id = req.params.id
      const {id} = req.params;
      console.log(id)
      //pool.query("DELETE FROM posts WHERE posts_id = $1", [id])
      const deletedPost = await pool.query("DELETE FROM posts WHERE posts_id = $1 RETURNING *", [id])
      res.json(deletedPost.rows)
    } catch (error) {
      console.error(error)
      res.status(500).json("server error")
    }
  }

    //Update profile info
    static async editInfo(req, res) {
    try {
      console.log(req.body)
      const { username, title, profile_pic} = req.body;
      const updateInfo = await pool.query(
        "UPDATE users SET username = $1,  title = $2,  profile_pic = $3 WHERE user_id = $4 RETURNING *",
        [username, title, profile_pic, req.user]
      );
      res.json(updateInfo.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json("server error");
    }
  }
}

module.exports = dashboardContoller;

