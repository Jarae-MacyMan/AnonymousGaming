const express = require("express");
const app = express();
const cors = require("cors");
//const dbPool = require('./dbconfig')
const usersRouter  = require('./routes/usersRouter')
const postsRouter  = require('./routes/postsRouter')
const homeRouter  = require('./routes/homeRouter')
const authRouter  = require('./routes/authRouter')


//const authCheck = require('./middleware/checkAuth');


app.use(cors());
app.use(express.json());

const PORT = 3001;

//app.use(authCheck)


app.use("/auth", authRouter);



app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/home', homeRouter)




app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});