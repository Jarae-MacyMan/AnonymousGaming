const pool = require('../dbconfig')

class UsersModel {
    static getUsersFromDB() {
        return pool.query('SELECT * FROM users ORDER BY user_id ').then(results => { return results.rows}) 
    }
    static getSingleUserFromDB(user_id) {
        return pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]).then(results => { return results.rows[0]})
    }
    static createUserFromDB(email, username, password) {
        return pool.query(
            "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
            [ email, username, password])

    }
     static updateUserFromDB(username, profile_pic, title, user_id) {
        return pool.query(
            "UPDATE users SET username = $1,  profile_pic = $2, title = $3 WHERE user_id = $4 RETURNING *",
        [username, profile_pic, title, user_id]);
    }
    
}

module.exports = UsersModel