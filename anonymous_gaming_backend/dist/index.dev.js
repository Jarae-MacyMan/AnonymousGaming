"use strict";

var express = require("express");

var app = express();

var cors = require("cors");

var _require = require("socket.io"),
    Server = _require.Server;

var server = require("http").createServer(app);

var request = require('request');

var jwt = require('jsonwebtoken'); //const dbPool = require('./dbconfig')


var usersRouter = require('./routes/usersRouter');

var postsRouter = require('./routes/postsRouter');

var homeRouter = require('./routes/homeRouter');

var authRouter = require('./routes/authRouter');

var dashboardRouter = require('./routes/dashboardRouter');

var pfpRouter = require('./routes/pfpRouter');

var friendRouter = require('./routes/friendRouter');

var chatRouter = require('./routes/chatRouter');

var messageRouter = require('./routes/messageRouter');

app.use(cors());
app.use(express.json());
var PORT = 3001; //app.use(authCheck)

app.use("/auth", authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/home', homeRouter);
app.use('/dashboard', dashboardRouter);
app.use('/pfp', pfpRouter);
app.use('/friend', friendRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter); //"file": 

var io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true"
  }
});
var activeUsers = [];
io.on("connect", function (socket) {
  console.log(socket.id); //add new user  on means get from frontend

  socket.on('new-user-add', function (newUserId) {
    if (!activeUsers.some(function (user) {
      return user.userId == newUserId;
    })) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id
      });
    }

    io.emit('get_users', activeUsers);
  }); //emit means send

  socket.on("disconnect", function () {
    activeUsers + activeUsers.filter(function (user) {
      return user.socketId != socket.id;
    });
    io.emit('get-users', activeUsers);
    console.log("user diconnected", socket.id);
  });
});
server.listen(PORT, function () {
  console.log("server is running on PORT ".concat(PORT));
});
io.use(function _callee(socket, next) {
  var token, payload;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = socket.handshake.query.Authorization;
          _context.next = 4;
          return regeneratorRuntime.awrap(jwt.verify(token, process.env.SECRET_KEY || 'shh'));

        case 4:
          payload = _context.sent;
          socket.userId = payload.user;
          _context.next = 10;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
io.on('connection', function (socket) {
  console.log("Connected:" + socket.userId);
  socket.on('disconnect', function () {
    console.log("Disconnected:" + socket.userId);
  });
});