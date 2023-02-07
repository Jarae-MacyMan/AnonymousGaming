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
  }]);

  return friendContoller;
}();

module.exports = friendContoller;