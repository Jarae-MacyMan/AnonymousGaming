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
      var id, fri, chatrooms, arr, finalArr, _i, _arr, x, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, y, chatsInfo;

      return regeneratorRuntime.async(function allUserChats$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.user;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM chats WHERE  $1 = any (members)", [id]));

            case 4:
              chatrooms = _context2.sent;
              arr = [];
              finalArr = [];
              chatrooms.rows.map(function (e) {
                return arr.push(e.members);
              });
              _i = 0, _arr = arr;

            case 9:
              if (!(_i < _arr.length)) {
                _context2.next = 44;
                break;
              }

              x = _arr[_i];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 14;
              _iterator = x[Symbol.iterator]();

            case 16:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 27;
                break;
              }

              y = _step.value;

              if (!(y != id)) {
                _context2.next = 24;
                break;
              }

              console.log(y);
              _context2.next = 22;
              return regeneratorRuntime.awrap(pool.query("SELECT username, user_id, profile_pic_id FROM users WHERE  user_id = $1 ", [y]));

            case 22:
              fri = _context2.sent;
              finalArr.push(fri.rows[0]);

            case 24:
              _iteratorNormalCompletion = true;
              _context2.next = 16;
              break;

            case 27:
              _context2.next = 33;
              break;

            case 29:
              _context2.prev = 29;
              _context2.t0 = _context2["catch"](14);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 33:
              _context2.prev = 33;
              _context2.prev = 34;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 36:
              _context2.prev = 36;

              if (!_didIteratorError) {
                _context2.next = 39;
                break;
              }

              throw _iteratorError;

            case 39:
              return _context2.finish(36);

            case 40:
              return _context2.finish(33);

            case 41:
              _i++;
              _context2.next = 9;
              break;

            case 44:
              console.log(finalArr); // for (let i of arr){
              //     if (i != id) {
              //         fri = await pool.query(
              //             "SELECT username, user_id, profile_pic_id FROM users WHERE  user_id = $1 ",
              //             [i])
              //         console.log(fri.rows[0])
              //     }
              // }

              chatsInfo = {
                chatRoom: chatrooms.rows,
                chattingWith: finalArr
              };
              res.json(chatsInfo); //res.json(finalArr);

              _context2.next = 53;
              break;

            case 49:
              _context2.prev = 49;
              _context2.t1 = _context2["catch"](1);
              console.error(_context2.t1);
              res.status(500).json("server error");

            case 53:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 49], [14, 29, 33, 41], [34,, 36, 40]]);
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