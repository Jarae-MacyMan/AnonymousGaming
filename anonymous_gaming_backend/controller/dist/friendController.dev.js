"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var friendContoller =
/*#__PURE__*/
function () {
  function friendContoller() {
    _classCallCheck(this, friendContoller);
  }

  _createClass(friendContoller, null, [{
    key: "sendFriendReq",
    value: function sendFriendReq(req, res) {
      var userId, otherUserId, addFr;
      return regeneratorRuntime.async(function sendFriendReq$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req.user);
              userId = req.body.userID;
              otherUserId = req.body.otherUserID;
              _context.prev = 3;
              _context.next = 6;
              return regeneratorRuntime.awrap(pool.query("INSERT INTO friend_status (usera_id, userb_id, status) VALUES ($1, $2, false) RETURNING *", [userId, otherUserId]));

            case 6:
              addFr = _context.sent;
              res.json(addFr.rows[0]);
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.error(_context.t0);
              res.status(500).json("server error");

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[3, 10]]);
    }
  }, {
    key: "getFriendReq",
    value: function getFriendReq(req, res) {
      var userId, otherUserId, checkFr;
      return regeneratorRuntime.async(function getFriendReq$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = req.params.userId;
              otherUserId = req.params.otherUserId; // console.log(userId)
              // console.log(otherUserId)

              _context2.prev = 2;
              _context2.next = 5;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM friend_status WHERE usera_id = $1 AND userb_id = $2", [userId, otherUserId]));

            case 5:
              checkFr = _context2.sent;
              //console.log(checkFr.rows[0])
              res.json(checkFr.rows[0]);
              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              console.error(_context2.t0);
              res.status(500).json("server error");

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[2, 9]]);
    }
  }, {
    key: "receiveFriendReq",
    value: function receiveFriendReq(req, res) {
      var id, receiveFriend, stats, userInfo;
      return regeneratorRuntime.async(function receiveFriendReq$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              //console.log(req.user)
              id = req.user;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM friend_status WHERE userb_id = $1", [id]));

            case 4:
              receiveFriend = _context3.sent;
              _context3.next = 7;
              return regeneratorRuntime.awrap(pool.query("SELECT username, user_id, profile_pic_id, status FROM friend_status FULL OUTER JOIN users ON usera_id = user_id"));

            case 7:
              stats = _context3.sent;
              userInfo = {
                receiveFriend: receiveFriend.rows[0],
                stats: stats.rows
              };
              res.json({
                userInfo: userInfo
              });
              _context3.next = 16;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](1);
              console.error(_context3.t0);
              res.status(500).json("server error");

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 12]]);
    }
  }, {
    key: "acceptFriendReq",
    value: function acceptFriendReq(req, res) {
      var id, accept;
      return regeneratorRuntime.async(function acceptFriendReq$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              //const id = req.user
              id = req.body.id;
              console.log(id);
              _context4.prev = 2;
              _context4.next = 5;
              return regeneratorRuntime.awrap(pool.query("UPDATE friend_status SET status = $1 WHERE usera_id = $2 RETURNING *", [true, id]));

            case 5:
              accept = _context4.sent;
              console.log(accept.rows[0]);
              res.json(accept.rows[0]);
              _context4.next = 14;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](2);
              console.error(_context4.t0);
              res.status(500).json("server error");

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[2, 10]]);
    }
  }]);

  return friendContoller;
}();

module.exports = friendContoller;