const pool = require('../dbconfig')

class homeModel {
    static getHomeFromDB() {
       return pool.query("SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id ORDER by posts.posts_id DESC")
    }
    //Get all comments for a post
    static getHomeCommentsFromDB(posts_id) {
        return pool.query("SELECT * FROM comments WHERE posts_id = $1",[posts_id]);
    }
    //comment on a post
    // static postHomeCommentsFromDB(content, posts_id, user_id) {
    //     pool.query("INSERT INTO comments (content, posts_id, user_id) VALUES($1, $2, $3) RETURNING *",[content, posts_id, user_id],);
    //     return pool.query("SELECT * FROM comments JOIN users ON comments.user_id = users.user_id ORDER BY comments.comments_id DESC")
    // }

    // static createPostFromDB(user_id, content) {
    //     return pool.query(
    //         "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",
    //         [user_id, content])
    // }
}

module.exports = homeModel


