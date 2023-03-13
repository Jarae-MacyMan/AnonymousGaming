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
  }
})

let activeUsers = []

io.on("connect", (socket) => {
  console.log(socket.id)

  //add new user  on means get from frontend
  //on is always active on the backend  with on we take info from forntend
  socket.on('new-user-add', (newUserId) => {
    if(!activeUsers.some((user) => user.userId == newUserId)) { //if user is not already registered in the socket
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id //new socket id
      })
    }
    console.log("Connected users",  activeUsers )
    io.emit('get_users', activeUsers)    //emit means send to the client side

  })

  // socket.on('send-message', (data) => { //search for current receiver in active users 
  //   const {receiverId} = data 
  //   const user = activeUsers.find((user) => user.userId = receiverId)
  //   console.log("sending message to rece", receiverId)
  //   console.log("Data", data)
  //   if(user){ //if user exsist then checkj their socket id 
  //     io.to(user.socket.id).emit('receive-message', data)
  //   }
  // })

  console.log(activeUsers)
  //when someone leaves remove them form arr
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId != socket.id) //takes the user id that is dissconeccting out of the array
    io.emit('get-users', activeUsers)
    console.log("user diconnected",  activeUsers)
  })
})





server.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});


