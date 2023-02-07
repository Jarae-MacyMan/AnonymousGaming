"use strict";

var express = require("express");

var app = express();

var cors = require("cors");

var _require = require("socket.io"),
    Server = _require.Server;

var server = require("http").createServer(app); //const dbPool = require('./dbconfig')


var usersRouter = require('./routes/usersRouter');

var postsRouter = require('./routes/postsRouter');

var homeRouter = require('./routes/homeRouter');

var authRouter = require('./routes/authRouter');

var dashboardRouter = require('./routes/dashboardRouter');

var pfpRouter = require('./routes/pfpRouter');

var friendRouter = require('./routes/friendRouter');

app.use(cors());
app.use(express.json());
var PORT = 3001; //app.use(authCheck)

app.use("/auth", authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/home', homeRouter);
app.use('/dashboard', dashboardRouter);
app.use('/pfp', pfpRouter);
app.use('/friend', friendRouter); //"file": 

var io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true"
  }
});
io.on("connection", function (socket) {
  console.log(socket.id);
  socket.on("disconnect", function () {
    console.log("user diconnected", socket.id);
  });
});
server.listen(PORT, function () {
  console.log("server is running on PORT ".concat(PORT));
});