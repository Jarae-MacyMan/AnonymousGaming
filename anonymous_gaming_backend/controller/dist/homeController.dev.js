"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var homeModel = require("../models/homeModel");

var homeContoller =
/*#__PURE__*/
function () {
  function homeContoller() {
    _classCallCheck(this, homeContoller);
  }

  _createClass(homeContoller, null, [{
    key: "getHome",
    //get all posts
    value: function getHome(req, res) {
      var posts;
      return regeneratorRuntime.async(function getHome$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(homeModel.getHomeFromDB());

            case 2:
              posts = _context.sent;
              res.status(200).send(posts.rows);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    } //Get all comments for a post

  }, {
    key: "getHomeComments",
    value: function getHomeComments(req, res) {
      var posts_id, comments;
      return regeneratorRuntime.async(function getHomeComments$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              posts_id = req.params.id;
              _context2.next = 3;
              return regeneratorRuntime.awrap(homeModel.getHomeCommentsFromDB(posts_id));

            case 3:
              comments = _context2.sent;

              if (comments.rows.length !== 0) {
                res.json(comments.rows);
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    } //comment on a post

  }, {
    key: "postHomeComments",
    value: function postHomeComments(req, res) {
      var _req$body, user_id, content, posts_id, allComments;

      return regeneratorRuntime.async(function postHomeComments$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$body = req.body, user_id = _req$body.user_id, content = _req$body.content;
              posts_id = req.params.id;
              _context3.next = 4;
              return regeneratorRuntime.awrap(homeModel.postHomeCommentsFromDB(content, posts_id, user_id));

            case 4:
              allComments = _context3.sent;

              if (allComments.rows.length !== 0) {
                res.json(allComments.rows);
              }

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "createHomePosts",
    value: function createHomePosts(req, res) {
      var _req$body2, user_id, content, newPost;

      return regeneratorRuntime.async(function createHomePosts$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body2 = req.body, user_id = _req$body2.user_id, content = _req$body2.content;
              _context4.next = 3;
              return regeneratorRuntime.awrap(homeModel.createPostFromDB(user_id, content));

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

  return homeContoller;
}();

module.exports = homeContoller; // async (req, res) => {
//     const posts =  await pool.query("SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id ORDER by posts.posts_id DESC")
//     res.json(posts.rows);
//     console.log(posts)
// });