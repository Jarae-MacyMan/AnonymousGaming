"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socketIo = require("socket.io.client");

var socket = new _socketIo.io("http://localhost:3001", {
  autoConnect: false,
  withCredentials: true
});
var _default = socket;
exports["default"] = _default;