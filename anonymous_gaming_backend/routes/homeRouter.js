const express = require('express')
const router = express.Router()
const homeController = require('../controller/homeController')

//
//console.log(pool)


//Get all questions
router.get("/", homeController.getHome)


//Get all comments for a post
router.get("/posts/:id", homeController.getHomeComments)


//comment on a post
router.post("/posts/:id", homeController.postHomeComments)
router.post("/post/:id", homeController.postHomePosts)



//like a post
//router.post("/like",  async (req, res) => {})

module.exports = router;
