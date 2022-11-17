"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PostsModel = require('../models/postsModel');

var postsController =
/*#__PURE__*/
function () {
  function postsController() {
    _classCallCheck(this, postsController);
  }

  _createClass(postsController, null, [{
    key: "getPosts",
    value: function getPosts(req, res) {
      var posts;
      return regeneratorRuntime.async(function getPosts$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(PostsModel.getPostsFromDB());

            case 2:
              posts = _context.sent;
              res.status(200).send(posts);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getSinglePost",
    value: function getSinglePost(req, res) {
      var post_id, post;
      return regeneratorRuntime.async(function getSinglePost$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              post_id = req.params.id;
              _context2.next = 3;
              return regeneratorRuntime.awrap(PostsModel.getSinglePostFromDB(post_id));

            case 3:
              post = _context2.sent;
              res.send(post);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    } // static async updatePost(req, res) {
    //   const id = req.params.id;
    //   const { content } = req.content;
    //   const updatedPost = await PostsModel.updatePostFromDB(id, content);
    //   if (updatedBlog.length === 0) {
    //       return res.status(404).send("Post not found");
    //     } else {
    //       return res.status(200).send(updatedBlog[0]);
    //     }
    // }

  }, {
    key: "deletePost",
    value: function deletePost(req, res) {
      var post_id, deletedPost;
      return regeneratorRuntime.async(function deletePost$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              post_id = req.params.id;
              _context3.next = 3;
              return regeneratorRuntime.awrap(PostsModel.deletePostFromDB(post_id));

            case 3:
              deletedPost = _context3.sent;

              if (!(deletedPost.length === 0)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(404).send("Post not found"));

            case 8:
              return _context3.abrupt("return", res.status(200).send(deletedPost[0]));

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "createPost",
    value: function createPost(req, res) {
      var _req$body, user_id, content, newPost;

      return regeneratorRuntime.async(function createPost$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body = req.body, user_id = _req$body.user_id, content = _req$body.content;
              _context4.next = 3;
              return regeneratorRuntime.awrap(PostsModel.createPostFromDB(user_id, content));

            case 3:
              newPost = _context4.sent;
              return _context4.abrupt("return", res.send(newPost.rows));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);

  return postsController;
}();

module.exports = postsController;