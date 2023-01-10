"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var homeModel = require("../models/homeModel");

var homeContoller =
/*#__PURE__*/
function () {
  function homeContoller() {
    _classCallCheck(this, homeContoller);
  }

  _createClass(homeContoller, null, [{
    key: "getUsers",
    //get all users
    value: function getUsers(req, res) {
      var userData, userPosts, userInfo;
      return regeneratorRuntime.async(function getUsers$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req.user);
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(pool.query("SELECT username, title, profile_pic FROM users WHERE user_id = $1", [req.user]));

            case 4:
              userData = _context.sent;
              _context.next = 7;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM posts JOIN users ON posts.user_id = users.user_id WHERE users.user_id = $1", [req.user]));

            case 7:
              userPosts = _context.sent;
              userInfo = {
                userData: userData.rows[0],
                userPosts: userPosts.rows
              };
              res.json({
                userInfo: userInfo
              });
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              console.error(_context.t0);
              res.status(500).json("server error");

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 12]]);
    } //get all posts

  }, {
    key: "getHome",
    value: function getHome(req, res) {
      var posts;
      return regeneratorRuntime.async(function getHome$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(homeModel.getHomeFromDB());

            case 2:
              posts = _context2.sent;
              res.status(200).send(posts.rows);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    } //Get all comments for a post

  }, {
    key: "getHomeComments",
    value: function getHomeComments(req, res) {
      var posts_id, comments;
      return regeneratorRuntime.async(function getHomeComments$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              posts_id = req.params.id;
              _context3.next = 3;
              return regeneratorRuntime.awrap(homeModel.getHomeCommentsFromDB(posts_id));

            case 3:
              comments = _context3.sent;

              if (comments.rows.length !== 0) {
                res.json(comments.rows);
              }

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "getHomeComment",
    value: function getHomeComment(req, res) {
      var comments;
      return regeneratorRuntime.async(function getHomeComment$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM comments INNER JOIN users ON comments.user_id = users.user_id ORDER by comments.comments_id DESC"));

            case 3:
              comments = _context4.sent;
              res.json(comments.rows);
              _context4.next = 11;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);
              res.status(500).json("server error");

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 7]]);
    } //comment on a post

  }, {
    key: "postHomeComments",
    value: function postHomeComments(req, res) {
      var user_id, comment, posts_id, postComment, allComments;
      return regeneratorRuntime.async(function postHomeComments$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              user_id = req.user;
              comment = req.body.comment;
              posts_id = req.params.id; //const { id } = req.params;

              _context5.next = 6;
              return regeneratorRuntime.awrap(pool.query("INSERT INTO comments (content, posts_id, user_id) VALUES($1, $2, $3) RETURNING *", [comment, posts_id, user_id]));

            case 6:
              postComment = _context5.sent;
              _context5.next = 9;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM comments JOIN users ON comments.user_id = users.user_id ORDER BY comments.comments_id DESC"));

            case 9:
              allComments = _context5.sent;
              //console.log(allComments)
              res.json(allComments.rows);
              _context5.next = 17;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0);
              res.status(500).json("server error");

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 13]]);
    }
  }, {
    key: "createHomePosts",
    value: function createHomePosts(req, res) {
      var post, createPost;
      return regeneratorRuntime.async(function createHomePosts$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              post = req.body.post;
              _context6.next = 4;
              return regeneratorRuntime.awrap(pool.query("INSERT INTO posts (content, user_id) VALUES ($1, $2) RETURNING *", [post, req.user]));

            case 4:
              createPost = _context6.sent;
              res.json(createPost.rows[0]);
              _context6.next = 12;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              console.error(_context6.t0);
              res.status(500).json("server error");

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }]);

  return homeContoller;
}();

module.exports = homeContoller;