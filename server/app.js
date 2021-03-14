const express = require('express');
const app = express();
const db= require('./db/db');
const cors = require('cors');
const category = require('./routes/categoryRoutes');

const PORT = process.env.PORT || 9800;

//parse data for post call
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

app.get('/health', (req,res) => {
  res.send("Health OK!!")
})

app.use('/category', category);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})