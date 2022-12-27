"use strict";

var url = "http://localhost:3001";
var token = "";

var getComments = function getComments() {
  return fetch("".concat(url, "/home"), {
    headers: {
      Authorization: "Bearer: ".concat(token)
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    return data;
  });
};

var signUpForm = document.getElementById("sign-up-form");
signUpForm.addEventListener("submit", function _callee(event) {
  var data, username, email, password, respose, responseData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          data = new FormData(event.target);
          username = data.get("username");
          email = data.get("email");
          password = data.get("password");
          _context.next = 7;
          return regeneratorRuntime.awrap(fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password
            })
          }));

        case 7:
          respose = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(respose.json());

        case 10:
          responseData = _context.sent;
          token = responseData.token;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
});
var logInForm = document.getElementById("log-in-form");
logInForm.addEventListener("submit", function _callee2(event) {
  var data, email, password, respose, responseData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          event.preventDefault();
          data = new FormData(event.target);
          email = data.get("email");
          password = data.get("password");
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          }));

        case 6:
          respose = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(respose.json());

        case 9:
          responseData = _context2.sent;
          token = responseData.token;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getCommentsBtn = document.getElementById('get-comments');
getCommentsBtn.addEventListener('click', function () {
  getComments();
});