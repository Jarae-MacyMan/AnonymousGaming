const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()

router.get('/', userController.getUsers)

//get user information
router.get('/:username', userController.getSingleUser)

router.post('/', userController.createUser)

//router.delete('/:id', userController.deleteUser)


router.put('/:id', userController.updateUser) 

// router.all('*', (req, res) => {
//     res.send("Does not exist")
// })



module.exports = router