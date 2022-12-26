"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var UsersModel =
/*#__PURE__*/
function () {
  function UsersModel() {
    _classCallCheck(this, UsersModel);
  }

  _createClass(UsersModel, null, [{
    key: "getUsersFromDB",
    value: function getUsersFromDB() {
      return pool.query('SELECT * FROM users ORDER BY user_id ').then(function (results) {
        return results.rows;
      });
    }
  }, {
    key: "getSingleUserFromDB",
    value: function getSingleUserFromDB(user_id) {
      return pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]).then(function (results) {
        return results.rows[0];
      });
    }
  }, {
    key: "createUserFromDB",
    value: function createUserFromDB(email, username, password) {
      return pool.query("INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *", [email, username, password]);
    }
  }, {
    key: "updateUserFromDB",
    value: function updateUserFromDB(username, profile_pic, title, user_id) {
      return pool.query("UPDATE users SET username = $1,  profile_pic = $2, title = $3 WHERE user_id = $4 RETURNING *", [username, profile_pic, title, user_id]);
    }
  }]);

  return UsersModel;
}();

module.exports = UsersModel;