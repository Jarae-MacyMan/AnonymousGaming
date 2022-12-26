
const homeModel = require("../models/homeModel");



class homeContoller {
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
    //comment on a post
    static async postHomeComments(req, res) {
        const { user_id, content} = req.body;
        const posts_id = req.params.id
        const allComments = await homeModel.postHomeCommentsFromDB(content, posts_id, user_id);
        if (allComments.rows.length !== 0) {
            res.json(allComments.rows);
        }
    }

    static async createHomePosts(req, res) {
        const { user_id, content } = req.body;
        const newPost = await homeModel.createPostFromDB(user_id, content);
        return res.send(newPost.rows);
    }
}

module.exports = homeContoller;







// async (req, res) => {
//     const posts =  await pool.query("SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id ORDER by posts.posts_id DESC")
//     res.json(posts.rows);
//     console.log(posts)
  
// });