const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    database: 'anonymous_gaming_DB',
    password: '',
})

//return a promise
// async function getPosts(){
//     //saves database query in a variable
//     const posts = await pool.query('SELECT * FROM posts').then(results => { return results.rows})
//     console.log(posts)
// }

// getPosts()


module.exports = pool


