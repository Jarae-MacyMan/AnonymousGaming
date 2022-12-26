"use strict";

var authCheck = function authCheck(req, res, next) {
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
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      data: "Not Authorized"
    });
  }

  next();
};

module.exports = authCheck;