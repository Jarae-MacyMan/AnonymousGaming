"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var HomeModel =
/*#__PURE__*/
function () {
  function HomeModel() {
    _classCallCheck(this, HomeModel);
  }

  _createClass(HomeModel, null, [{
    key: "getHomeFromDB",
    value: function getHomeFromDB() {
      //console.log("hey")
      //const posts = pool.query('SELECT * FROM posts').then(results => { return results.rows})
      //DESC
      //return pool.query('SELECT * FROM posts ORDER BY posts_id ').then(results => { return results.rows}) 
      return pool.query("SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id ORDER by posts.posts_id DESC");
    }
  }]);

  return HomeModel;
}();

module.exports = HomeModel;