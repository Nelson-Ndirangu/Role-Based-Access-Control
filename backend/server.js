const express = require('express');
require('dotenv').config();
const connectDB = require("./config/db")

const app = express();

// Middleware
app.use(express.json());

// db connection
connectDB();


// Default route
app.use('/', (req,res)=>{
    res.send("RBAC is up and running..")
})

// Listening to the port
const PORT = process.env.PORT|| 8000;

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost${PORT}`)
})
