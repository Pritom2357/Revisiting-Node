const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const { type } = require('os');

const app = express();
const PORT = 3000;

const userRouter = require('./routes/user.js');
const {connectMongoDB} = require('./connection.js');
const {logReqRes} = require('./middlewares/index.js');
const {handleGetAllUsers} = require('./controllers/user.js');

connectMongoDB('mongodb://127.0.0.1:27017/testing');

app.use(express.urlencoded({extended: false}));

app.use('/user', userRouter);
app.use(logReqRes("log.txt"))

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:3000");
});

