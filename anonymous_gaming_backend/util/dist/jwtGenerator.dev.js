"use strict";

var jwt = require('jsonwebtoken');

var secretSigningKey = process.env.SECRET_KEY || 'shh';

var generateToken = function generateToken(userId) {
  return jwt.sign({
    userId: userId
  }, secretSigningKey);
};

var verifyToken = function verifyToken(token) {
  return jwt.verify(token, secretSigningKey);
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken
};