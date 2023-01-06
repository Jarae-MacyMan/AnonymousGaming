"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var dashboardContoller =
/*#__PURE__*/
function () {
  function dashboardContoller() {
    _classCallCheck(this, dashboardContoller);
  }

  _createClass(dashboardContoller, null, [{
    key: "getUsers",
    //get user info and posts
    value: function getUsers(req, res) {
      var userData, userPosts, userInfo;
      return regeneratorRuntime.async(function getUsers$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req.user); //comes from auth header

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
    } //Get all commments form a post 

  }, {
    key: "getComments",
    value: function getComments(req, res) {
      var id, comments;
      return regeneratorRuntime.async(function getComments$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM comments WHERE post_id = $1", [posts_id]));

            case 4:
              comments = _context2.sent;

              if (comments.rows.length !== 0) {
                res.json(comments.rows);
              }

              _context2.next = 12;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);
              res.status(500).json("server error");

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 8]]);
    } //Post a question

  }, {
    key: "createPost",
    value: function createPost(req, res) {
      var post, createPost;
      return regeneratorRuntime.async(function createPost$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              console.log(req.body);
              post = req.body.post;
              _context3.next = 5;
              return regeneratorRuntime.awrap(pool.query("INSERT INTO posts (content, user_id) VALUES ($1, $2) RETURNING *", [post, req.user]));

            case 5:
              createPost = _context3.sent;
              res.json(createPost.rows[0]);
              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);
              res.status(500).json("server error");

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 9]]);
    } //Delete a question 

  }, {
    key: "deletePost",
    value: function deletePost(req, res) {
      var id, deletedQuestion;
      return regeneratorRuntime.async(function deletePost$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id;
              console.log(id);
              pool.query("DELETE FROM answers WHERE answers.question_id = $1", [id]);
              _context4.next = 6;
              return regeneratorRuntime.awrap(pool.query("DELETE FROM questions WHERE question_id = $1 RETURNING *", [id]));

            case 6:
              deletedQuestion = _context4.sent;
              res.json(deletedQuestion.rows);
              _context4.next = 14;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);
              res.status(500).json("server error");

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 10]]);
    } //Update profile info

  }, {
    key: "editInfo",
    value: function editInfo(req, res) {
      var _req$body, username, title, profile_pic, updateInfo;

      return regeneratorRuntime.async(function editInfo$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              console.log(req.body);
              _req$body = req.body, username = _req$body.username, title = _req$body.title, profile_pic = _req$body.profile_pic;
              _context5.next = 5;
              return regeneratorRuntime.awrap(pool.query("UPDATE users SET username = $1,  title = $2,  profile_pic = $3 WHERE user_id = $4 RETURNING *", [username, title, profile_pic, req.user]));

            case 5:
              updateInfo = _context5.sent;
              res.json(updateInfo.rows[0]);
              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0);
              res.status(500).json("server error");

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }]);

  return dashboardContoller;
}();

module.exports = dashboardContoller;