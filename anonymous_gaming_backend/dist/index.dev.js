"use strict";

var express = require("express");

var app = express();

var cors = require("cors"); //const dbPool = require('./dbconfig')


var usersRouter = require('./routes/usersRouter');

var postsRouter = require('./routes/postsRouter');

var homeRouter = require('./routes/homeRouter');

var authRouter = require('./routes/authRouter'); //const authCheck = require('./middleware/checkAuth');


app.use(cors());
app.use(express.json());
var PORT = 3001; //app.use(authCheck)

app.use("/auth", authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/home', homeRouter);
app.listen(PORT, function () {
  console.log("server is running on PORT ".concat(PORT));
});