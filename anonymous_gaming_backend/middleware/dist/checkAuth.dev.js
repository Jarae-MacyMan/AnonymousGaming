"use strict";

var _require = require('../util/jwtGenerator.js'),
    verifyToken = _require.verifyToken;

var authCheck = function authCheck(req, res, next) {
  //next = middlewear
  var headers = req.headers;
  var authHeader = headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      data: "NOT AUTHORIZED"
    });
  }

  var authToken = authHeader.split(" ")[1];

  if (!authToken) {
    return res.status(401).json({
      data: "NOT AUTHORIZED"
    });
  }

  var decodedToken;

  try {
    decodedToken = verifyToken(authToken);
    req.user = decodedToken.user;
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      data: "Not Authorized"
    });
  }

  next();
};

module.exports = authCheck;