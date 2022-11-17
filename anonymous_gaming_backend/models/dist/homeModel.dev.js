"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var homeModel =
/*#__PURE__*/
function () {
  function homeModel() {
    _classCallCheck(this, homeModel);
  }

  _createClass(homeModel, null, [{
    key: "getHomeFromDB",
    value: function getHomeFromDB() {
      //console.log("hey")
      //const posts = pool.query('SELECT * FROM posts').then(results => { return results.rows})
      //DESC
      //return pool.query('SELECT * FROM posts ORDER BY posts_id ').then(results => { return results.rows}) 
      return pool.query("SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id ORDER by posts.posts_id DESC");
    } //Get all comments for a post

  }, {
    key: "getHomeCommentsFromDB",
    value: function getHomeCommentsFromDB(posts_id) {
      return pool.query("SELECT * FROM comments WHERE posts_id = $1", [posts_id]);
    } //comment on a post

  }, {
    key: "postHomeCommentsFromDB",
    value: function postHomeCommentsFromDB(content, posts_id, user_id) {
      pool.query("INSERT INTO comments (content, posts_id, user_id) VALUES($1, $2, $3) RETURNING *", [content, posts_id, user_id]);
      return pool.query("SELECT * FROM comments JOIN users ON comments.user_id = users.user_id ORDER BY comments.comments_id DESC");
    }
  }, {
    key: "createPostFromDB",
    value: function createPostFromDB(user_id, content) {
      return pool.query("INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *", [user_id, content]);
    }
  }]);

  return homeModel;
}();

module.exports = homeModel;