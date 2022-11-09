const PostsModel = require('../models/postsModel')

class postsController {
    static async getPosts(req, res) {
      const posts = await PostsModel.getPostsFromDB();
      res.status(200).send(posts);
    }
    static async getSinglePost(req, res) {
      const post_id = req.params.id;
      const post = await PostsModel.getSinglePostFromDB(post_id);
      res.send(post);
    }
    
    // static async updatePost(req, res) {
    //   const id = req.params.id;
    //   const { content } = req.content;
    //   const updatedPost = await PostsModel.updatePostFromDB(id, content);
    //   if (updatedBlog.length === 0) {
    //       return res.status(404).send("Post not found");
    //     } else {
    //       return res.status(200).send(updatedBlog[0]);
    //     }
    // }
  
    static async deletePost(req, res) {
      const post_id = req.params.id;
      const deletedPost = await PostsModel.deletePostFromDB(post_id);
      if (deletedPost.length === 0) {
        return res.status(404).send("Post not found");
      } else {
        return res.status(200).send(deletedPost[0]);
      }
    }
    static async createPost(req, res) {
      const { user_id, content } = req.body;
      const newPost = await PostsModel.createPostFromDB(user_id, content);
      return res.send(newPost.rows);
    }
  }
  
  module.exports = postsController;
  