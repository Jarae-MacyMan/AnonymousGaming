"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../dbconfig');

var pfpController =
/*#__PURE__*/
function () {
  function pfpController() {
    _classCallCheck(this, pfpController);
  }

  _createClass(pfpController, null, [{
    key: "createPfp",
    value: function createPfp(req, res) {
      var createPic;
      return regeneratorRuntime.async(function createPfp$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(pool.query("INSERT INTO file (file) VALUES ($1) RETURNING *", [file]));

            case 3:
              createPic = _context.sent;
              res.json(createPic.rows[0]);
              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              res.status(500).json("server error");

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }]);

  return pfpController;
}();

module.exports = pfpController;