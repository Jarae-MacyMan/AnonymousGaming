"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var PostsModel =
/*#__PURE__*/
function () {
  function PostsModel() {
    _classCallCheck(this, PostsModel);
  }

  _createClass(PostsModel, null, [{
    key: "getPostsFromDB",
    value: function getPostsFromDB() {
      //console.log("hey")
      //const posts = pool.query('SELECT * FROM posts').then(results => { return results.rows})
      //DESC
      //return pool.query('SELECT * FROM posts ORDER BY posts_id ').then(results => { return results.rows}) 
      return pool.query('SELECT * FROM posts ORDER BY posts_id ').then(function (results) {
        return results.rows;
      });
    }
  }, {
    key: "getSinglePostFromDB",
    value: function getSinglePostFromDB(posts_id) {
      return pool.query("SELECT * FROM posts WHERE posts_id = $1", [posts_id]).then(function (results) {
        return results.rows[0];
      });
    } // static updatePostFromDB(user_id, post_id, content) {
    //     return pool.query(`UPDATE posts SET content = $1 WHERE posts_id = $1`, [id]).then(results => { return results.rows})
    // }

  }, {
    key: "deletePostFromDB",
    value: function deletePostFromDB(posts_id) {
      return pool.query("DELETE FROM posts WHERE posts_id = $1", [posts_id]).then(function (results) {
        return results.rows;
      });
    }
  }, {
    key: "createPostFromDB",
    value: function createPostFromDB(user_id, content) {
      return pool.query("INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *", [user_id, content]);
    }
  }]);

  return PostsModel;
}();

module.exports = PostsModel;