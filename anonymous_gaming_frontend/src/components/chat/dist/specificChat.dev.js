"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _socket = require("socket.io-client");

var _context = _interopRequireDefault(require("../../context/context"));

var React = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _NavChat = _interopRequireDefault(require("./NavChat.js"));

var _Navbar = _interopRequireDefault(require("../navbar/Navbar"));

var _Box = _interopRequireDefault(require("@mui/material/Box"));

var _Card = _interopRequireDefault(require("@mui/material/Card"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _AccountCircle = _interopRequireDefault(require("@mui/icons-material/AccountCircle"));

var _Grid = _interopRequireDefault(require("@mui/material/Grid"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var specific = function specific(props) {};