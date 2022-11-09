const express = require("express");
const app = express();
const cors = require("cors");
//const dbPool = require('./dbconfig')
const usersRouter  = require('./routes/usersRouter')
const postsRouter  = require('./routes/postsRouter')



app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("")
})

app.use('/users', usersRouter)
app.use('/posts', postsRouter)




app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});