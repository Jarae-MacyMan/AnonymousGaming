const pool = require('../dbconfig')

class Post {
    static getPosts() {
        return pool.query('SELECT * FROM posts ORDER BY posts_id ').then(results => { return results.rows}) 
    }

    // static getTodoById(id) {
    //     return pool.query("SELECT * FROM todo WHERE id = $1", [id]).then(results => { return results.rows[0]})
    // }

    // static createTodo(description) {
    //     return pool.query("INSERT INTO todo (description, completed) VALUES ($1, false) RETURNING description ", [description]).then(results => { return results.rows[0]})
    // }

    // static deleteTodo(id) {
    //     return pool.query("DELETE FROM todo WHERE id = $1", [id]).then(results => { return results.rows})
    // }

    // static updateTodo(id, update) {
    //     return pool.query(`UPDATE todo SET completed = ${update} WHERE id = $1`, [id]).then(results => { return results.rows})
    // }

    // static updateTodoPut(id, description) {
    //     return pool.query(`UPDATE todo SET description = ${description} WHERE id = $1`, [id]).then(results => { return results.rows})
    // }
}

module.exports = Post