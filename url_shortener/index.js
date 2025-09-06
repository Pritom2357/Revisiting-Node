const express = require('express');
const urlRoute = require('./routes/url.js');
const {connectDB} = require('./connect.js');
const URL = require('./models/url.js')

const app = express();
const PORT = 8001;

connectDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log("DB connected"));

app.use(express.json())

app.use('/url', urlRoute);


app.listen(PORT, ()=> console.log(`Server started at: http://localhost:${PORT}`));
