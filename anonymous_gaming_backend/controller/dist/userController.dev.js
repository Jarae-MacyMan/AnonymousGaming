"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var usersModel = require("../models/usersModel");

var pool = require('../dbconfig');

var usersContoller =
/*#__PURE__*/
function () {
  function usersContoller() {
    _classCallCheck(this, usersContoller);
  }

  _createClass(usersContoller, null, [{
    key: "getUsers",
    value: function getUsers(req, res) {
      var users;
      return regeneratorRuntime.async(function getUsers$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(usersModel.getUsersFromDB());

            case 2:
              users = _context.sent;
              res.status(200).send(users);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getSingleUser",
    value: function getSingleUser(req, res) {
      var username, userData, userID, userPosts, userInfo;
      return regeneratorRuntime.async(function getSingleUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              username = req.params.username;
              _context2.next = 4;
              return regeneratorRuntime.awrap(pool.query("SELECT username, user_id, title, profile_pic_id, games_won, games_lost FROM users WHERE username = $1", [username]));

            case 4:
              userData = _context2.sent;
              userID = userData.rows[0].user_id;
              _context2.next = 8;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM posts JOIN users ON posts.user_id = users.user_id WHERE users.user_id = $1", [userID]));

            case 8:
              userPosts = _context2.sent;
              userInfo = {
                userData: userData.rows[0],
                userPosts: userPosts.rows
              };
              res.json({
                userInfo: userInfo
              });
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);
              res.status(500).json("server error");

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 13]]);
    }
  }, {
    key: "updateUser",
    value: function updateUser(req, res) {
      var user_id, _req$body, username, profile_pic, title, updatedUser;

      return regeneratorRuntime.async(function updateUser$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              user_id = req.params.id;
              _req$body = req.body, username = _req$body.username, profile_pic = _req$body.profile_pic, title = _req$body.title;
              _context3.next = 4;
              return regeneratorRuntime.awrap(usersModel.updateUserFromDB(username, profile_pic, title, user_id));

            case 4:
              updatedUser = _context3.sent;
              return _context3.abrupt("return", res.status(201).send(updatedUser.rows[0]));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "createUser",
    value: function createUser(req, res) {
      var _req$body2, username, email, password, newUser;

      return regeneratorRuntime.async(function createUser$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password;

              if (!(!username || !password || !email)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", res.status(404).send("Insufficient information"));

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(usersModel.createUserFromDB(username, email, password));

            case 5:
              newUser = _context4.sent;
              return _context4.abrupt("return", res.status(201).send(newUser));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      });
    } // static async deleteUser(req, res) {
    //   const id = req.params.id;
    //   const deletedUser = await usersModel.deleteUserFromDB(id);
    //   if (deletedUser.length === 0) {
    //     return res.status(404).send("User not found");
    //   } else {
    //     return res.status(200).send(deletedUser[0]);
    //   }
    // }

  }]);

  return usersContoller;
}();

module.exports = usersContoller;