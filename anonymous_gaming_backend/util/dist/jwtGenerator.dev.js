"use strict";

var jwt = require('jsonwebtoken');

var generateToken = function generateToken(userId) {
  //send user ID to front end 
  var payload = {
    user: userId
  };
  return jwt.sign(payload, process.env.SECRET_KEY || 'shh');
};

var verifyToken = function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY || 'shh');
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken
};