const express = require("express");
const app = express();
const cors = require("cors");
//const dbPool = require('./dbconfig')
const usersRouter  = require('./routes/usersRouter')
const postsRouter  = require('./routes/postsRouter')
const homeRouter  = require('./routes/homeRouter')



app.use(cors());
app.use(express.json());

const PORT = 3001;


app.use("/home", homeRouter);


app.use('/users', usersRouter)
app.use('/posts', postsRouter)




app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});