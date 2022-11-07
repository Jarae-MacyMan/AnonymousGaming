const Post = require('../models/postsModels')

const getPosts = async (req, res) => {
    //make a quesry to our database and respond with pets 
    const post = await Post.getPosts()
    res.status(200).json(post)
}
// //app.get('/todo',

// const getSingleTodo = async (req, res) => {
//     const id = req.params.id
//     const todo = await Todo.getTodoById(id)
//     if (todo){
//         res.status(200).json(todo)
//     } else {
//         res.sendStatus(404)
//     }
// }
// //app.get('/todo/:id',

// const createTodos =  async (req, res) => {
//     //destructuring syntax
//     const description = req.body.description
//     const todo = await Todo.createTodo(description)
//     res.status(201).json(todo)
// }
// //app.post('/todo',


// const updateTodosPut = async (req, res) => {
//     let id = parseInt(req.params.id)
//     const description = req.body.description
//     const todo = await Todo.updateTodoPut(id, description)
//     res.status(204).json(todo);
// }

// const updateTodos = async (req, res) => {
//     let id = parseInt(req.params.id)
//     let update = true
//     const todo = await Todo.updateTodo(id, update)
//     res.status(204).json(todo);
// }

// const deleteTodos = async (req, res) => {
//     let id = req.params.id
//     const todo = await Todo.deleteTodo(id)
//     res.status(204).json(todo)
// }

module.exports = {
    getPosts,
//     getSingleTodo,
//     createTodos,
//     updateTodos,
//     deleteTodos,
//     updateTodosPut
}