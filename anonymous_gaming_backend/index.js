const express = require("express");
const app = express();
const cors = require("cors");
const {Server} = require("socket.io")
const server = require("http").createServer(app)
const request = require('request')
const jwt = require('jsonwebtoken');



//const dbPool = require('./dbconfig')
const usersRouter  = require('./routes/usersRouter')
const postsRouter  = require('./routes/postsRouter')
const homeRouter  = require('./routes/homeRouter')
const authRouter  = require('./routes/authRouter')
const dashboardRouter  = require('./routes/dashboardRouter')
const pfpRouter  = require('./routes/pfpRouter')
const friendRouter  = require('./routes/friendRouter')
const chatRouter = require('./routes/chatRouter')
const messageRouter = require('./routes/messageRouter')









app.use(cors());
app.use(express.json());

const PORT = 3001;

//app.use(authCheck)


app.use("/auth", authRouter);



app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/home', homeRouter)
app.use('/dashboard', dashboardRouter)
app.use('/pfp', pfpRouter)
app.use('/friend', friendRouter)
app.use('/chat', chatRouter)
app.use('/message', messageRouter)




//"file": 


const io = new Server(server, {
  cors: {
    origin:"http://localhost:3000",
    credentials: "true"
  }
})

// io.on("connect", (socket) => {
//   console.log(socket.id)

//   socket.on("disconnect", () => {
//     console.log("user diconnected", socket.id)
//   })
// })





server.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

io.use( async (socket, next)=>{
  try{
    const token = socket.handshake.query.Authorization
    const payload = await jwt.verify(token, process.env.SECRET_KEY || 'shh')
    socket.userId = payload.user
  } catch (err) {}
})

io.on('connection', (socket) => {
  console.log("Connected:" + socket.userId)

  socket.on('disconnect', ()=> {
    console.log("Disconnected:" + socket.userId)

  })
})