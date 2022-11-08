const express = require("express");
const app = express();
const cors = require("cors");
//const dbPool = require('./dbconfig')
const usersRouter  = require('./routes/usersRouter')


app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("")
})

app.use('/users', usersRouter)



app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});