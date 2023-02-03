const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const authCheck = require('../middleware/checkAuth');


router.get('/', userController.getUsers)

//get user information
router.get('/:username', authCheck, userController.getSingleUser)

router.post('/', userController.createUser)

//router.delete('/:id', userController.deleteUser)


router.put('/:id', userController.updateUser) 

// router.all('*', (req, res) => {
//     res.send("Does not exist")
// })



module.exports = router