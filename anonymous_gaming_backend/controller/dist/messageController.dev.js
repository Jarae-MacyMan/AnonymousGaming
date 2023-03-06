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
      var _req$body, chatId, senderId, text;

      return regeneratorRuntime.async(function addMessage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, chatId = _req$body.chatId, senderId = _req$body.senderId, text = _req$body.text;

              try {} catch (error) {
                console.error(error);
                res.status(500).json("server error");
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getMessages",
    value: function getMessages(req, res) {
      var chatId;
      return regeneratorRuntime.async(function getMessages$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              chatId = req.params.chatId;

              try {} catch (error) {
                console.error(error);
                res.status(500).json("server error");
              }

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return MessageChat;
}();

module.exports = MessageChat;