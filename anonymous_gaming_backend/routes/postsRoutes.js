// app.get('/posts', async (req, res) => {
//     const posts = await dbPool.query('SELECT * FROM posts ORDER BY user_id')
//         .then(results => {return results.rows})
//     res.status(200).json(posts)
// })

const express = require('express')
const postController = require('../controller/postController')
const router = express.Router()

router.get('/', postController.getPosts)

// router.get('/:id', todoController.getSingleTodo)

// router.post('/', todoController.createTodos)

// router.delete('/:id', todoController.deleteTodos)

// router.patch('/:id', todoController.updateTodos)

// router.put('/:id', todoController.updateTodosPut) 

router.all('*', (req, res) => {
    res.send("Does not exist")
})

module.exports = router
