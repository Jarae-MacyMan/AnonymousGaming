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
              console.error(_context.t0);
              res.status(500).send("This email is already in use");

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[2, 15]]);
    }
  }, {
    key: "getLogin",
    value: function getLogin(req, res) {
      var _req$body2, email, password, user, validPassword, token;

      return regeneratorRuntime.async(function getLogin$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(pool.query("SELECT * FROM users WHERE email = $1", [email]));

            case 4:
              user = _context2.sent;

              if (user.rows.length === 0) {
                res.status(401).json("email is incorrect");
              }

              _context2.next = 8;
              return regeneratorRuntime.awrap(bcrypt.compare(password, user.rows[0].password));

            case 8:
              validPassword = _context2.sent;

              if (!validPassword) {
                res.status(401).json("password is incorrect");
              }

              token = generateToken(user.rows[0].user_id);
              res.json({
                token: token
              });
              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](1);
              console.error(_context2.t0);
              res.status(500).send("Server Error");

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 14]]);
    }
  }]);

  return authContoller;
}();

module.exports = authContoller;