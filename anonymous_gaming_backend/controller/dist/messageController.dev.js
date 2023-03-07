"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var MessageChat =
/*#__PURE__*/
function () {
  function MessageChat() {
    _classCallCheck(this, MessageChat);
  }

  _createClass(MessageChat, null, [{
    key: "addMessage",
    value: function addMessage(req, res) {
      var _req$body, chatId, senderId, text, message;

      return regeneratorRuntime.async(function addMessage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, chatId = _req$body.chatId, senderId = _req$body.senderId, text = _req$body.text;
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(pool.query("INSERT INTO messages (chat_id, sender_id, text) VALUES ($1, $2, $3) RETURNING *", [chatId, senderId, text]));

            case 4:
              message = _context.sent;
              res.json(message.rows[0]);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              console.error(_context.t0);
              res.status(500).json("server error");

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 8]]);
    }
  }, {
    key: "getMessages",
    value: function getMessages(req, res) {
      var chatId, allMessages;
      return regeneratorRuntime.async(function getMessages$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              chatId = req.params.chatId;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM messages WHERE chat_id = $1", [chatId]));

            case 4:
              allMessages = _context2.sent;
              res.json(allMessages.rows);
              _context2.next = 12;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              console.error(_context2.t0);
              res.status(500).json("server error");

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 8]]);
    }
  }]);

  return MessageChat;
}();

module.exports = MessageChat;