const pool = require('../dbconfig')

class PostsModel {
    static getPostsFromDB() {
        //console.log("hey")
        //const posts = pool.query('SELECT * FROM posts').then(results => { return results.rows})
        //DESC
        //return pool.query('SELECT * FROM posts ORDER BY posts_id ').then(results => { return results.rows}) 
        return pool.query('SELECT * FROM posts ORDER BY posts_id ').then(results => { return results.rows})

    }
    static getSinglePostFromDB(posts_id) {
        return pool.query("SELECT * FROM posts WHERE posts_id = $1", [posts_id]).then(results => { return results.rows[0]})
    }
    // static updatePostFromDB(user_id, post_id, content) {
    //     return pool.query(`UPDATE posts SET content = $1 WHERE posts_id = $1`, [id]).then(results => { return results.rows})
    // }
    static deletePostFromDB(posts_id) {
        return pool.query("DELETE FROM posts WHERE posts_id = $1", [posts_id]).then(results => { return results.rows})
    }
    static createPostFromDB(user_id, content) {
        return pool.query(
            "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",
            [user_id, content])
    }
}

module.exports = PostsModel