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
    origin: "http://localhost:3000"
  }
});
var activeUsers = [];
io.on("connect", function (socket) {
  console.log(socket.id); //add new user  on means get from frontend
  //on is always active on the backend  with on we take info from forntend

  socket.on('new-user-add', function (newUserId) {
    if (!activeUsers.some(function (user) {
      return user.userId == newUserId;
    })) {
      //if user is not already registered in the socket
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id //new socket id

      });
    }

    console.log("Connected users", activeUsers);
    io.emit('get_users', activeUsers); //emit means send to the client side
  }); // socket.on('send-message', (data) => { //search for current receiver in active users 
  //   const {receiverId} = data 
  //   const user = activeUsers.find((user) => user.userId = receiverId)
  //   console.log("sending message to rece", receiverId)
  //   console.log("Data", data)
  //   if(user){ //if user exsist then checkj their socket id 
  //     io.to(user.socket.id).emit('receive-message', data)
  //   }
  // })

  console.log(activeUsers); //when someone leaves remove them form arr

  socket.on("disconnect", function () {
    activeUsers = activeUsers.filter(function (user) {
      return user.socketId != socket.id;
    }); //takes the user id that is dissconeccting out of the array

    io.emit('get-users', activeUsers);
    console.log("user diconnected", activeUsers);
  });
});
server.listen(PORT, function () {
  console.log("server is running on PORT ".concat(PORT));
});