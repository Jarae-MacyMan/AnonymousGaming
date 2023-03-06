"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var classChat =
/*#__PURE__*/
function () {
  function classChat() {
    _classCallCheck(this, classChat);
  }

  _createClass(classChat, null, [{
    key: "createChatRoom",
    value: function createChatRoom(req, res) {
      var member, otherMember, chatroom;
      return regeneratorRuntime.async(function createChatRoom$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              //   //const posts_id = req.params.id
              //   const {id} = req.params;
              //   const {name} = req.body;
              //const id = req.user
              member = req.body.senderId;
              otherMember = req.body.receiverId; //console.log(member)
              //console.log(otherMember)
              //const members = [req.body.senderId, req.body.receiverId]

              _context.next = 5;
              return regeneratorRuntime.awrap(pool.query("INSERT INTO chats (members) VALUES (ARRAY [$1, $2]) RETURNING *", [member, otherMember]));

            case 5:
              chatroom = _context.sent;
              res.json(chatroom.rows[0]);
              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              res.status(500).json("server error");

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "allUserChats",
    value: function allUserChats(req, res) {
      var member, chatrooms;
      return regeneratorRuntime.async(function allUserChats$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              member = req.params.userId;
              console.log(member);
              _context2.next = 5;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM chats WHERE  $1 = any (members)", [member]));

            case 5:
              chatrooms = _context2.sent;
              console.log(chatrooms.rows);
              res.json(chatrooms.rows);
              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);
              res.status(500).json("server error");

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }, {
    key: "findChat",
    value: function findChat(req, res) {
      var member, otherMember, chatroom;
      return regeneratorRuntime.async(function findChat$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              member = req.params.firstId;
              otherMember = req.params.secondId;
              console.log(otherMember);
              _context3.next = 6;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM chats WHERE $1 = any (members) AND $2 = any (members)", [member, otherMember]));

            case 6:
              chatroom = _context3.sent;
              res.json(chatroom.rows[0]);
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);
              res.status(500).json("server error");

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }]);

  return classChat;
}();

module.exports = classChat;