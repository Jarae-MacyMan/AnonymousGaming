"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var bcrypt = require("bcrypt");

var _require = require("../util/jwtGenerator"),
    generateToken = _require.generateToken;

var authContoller =
/*#__PURE__*/
function () {
  function authContoller() {
    _classCallCheck(this, authContoller);
  }

  _createClass(authContoller, null, [{
    key: "createRegister",
    //get all posts
    value: function createRegister(req, res) {
      var _req$body, username, email, password, saltRounds, hashedPassword, newUser, token;

      return regeneratorRuntime.async(function createRegister$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
              saltRounds = 10; // Required for authentication

              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(bcrypt.hash(password, saltRounds));

            case 5:
              hashedPassword = _context.sent;

              if (!(!username || !password || !email)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(404).send("Insufficient information"));

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(pool.query("INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *", [email, username, hashedPassword]));

            case 10:
              newUser = _context.sent;
              token = generateToken(newUser.rows[0].user_id);
              return _context.abrupt("return", res.status(201).send({
                token: token
              }));

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](2);
              res.status(500).json({
                message: err.message
              });

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[2, 15]]);
    }
  }]);

  return authContoller;
}();

module.exports = authContoller;