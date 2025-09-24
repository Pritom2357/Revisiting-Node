const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');
const fs = require('fs');
const zlib = require('zlib')

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket)=>{
    socket.on('user-message', (message)=>{
        io.emit('message', message + "from server")
        console.log("User message: ", message);
    })
})

app.use(express.static(path.resolve('./public')));

fs.createReadStream('./sample.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('./sample.zip')));

app.get('/', (req, res)=>{
    return res.sendFile('/public/index.html');
})

app.get('/file', (req, res) => {
    const stream = fs.createReadStream('./sample.txt', 'utf-8');
    stream.on('data', (chunk)=> res.write(chunk))
    stream.on('end', ()=> res.end())
});

app.get('/cluster', (req, res)=>{
    return res.json({
        message: `Hello: ${process.pid}`
    })
})

server.listen(9000, ()=>{
    console.log(`Server started at: http://localhost:9000`);
    
})