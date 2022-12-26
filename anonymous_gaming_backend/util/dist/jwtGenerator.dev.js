"use strict";

var jwt = require('jsonwebtoken');

var secretSigningKey = process.env.SECRET_KEY || 'shh';

var generateToken = function generateToken(playerId) {
  return jwt.sign({
    playerId: playerId
  }, secretSigningKey);
};

var verifyToken = function verifyToken(token) {
  return jwt.verify(token, secretSigningKey);
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken
};