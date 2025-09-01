const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    return res.send('Hello from home page');
});

app.get('/about', (req, res)=>{
    res.send('hello from about page');
});

// const myServer = http.createServer((pri, tom)=>{ // ideally should be (req, res)
//     // console.dir(pri, {depth: null});
//     // console.log(tom);

//     // console.log(pri.headers);
//     // console.log(pri)
//     const log = `${Date.now()}: ${pri.method}: ${pri.url}: New request received\n`;
//     const myUrl = url.parse(pri.url, true, true);
//     // console.log(myUrl);
//     // console.log(myUrl.pathname.split('/')[1]);
    
//     if(pri.url == '/favicon.ico') return tom.end()
//     fs.appendFile('./log.txt', log,  (err, data)=>{
//         if(err) throw err;
//         switch(myUrl.pathname.split('/')[1]){
//             case '': 
//             if(pri.method == 'GET')
//                 tom.end("It is home page"); 
//             break;
//             case 'about': 
//                 const username = myUrl.query.my_name;
//                 tom.end(`Hi, ${username}`); 
//                 break;
//             case 'contact-us': 
//                 tom.end("It is contact-us page"); 
//                 break;
//             case 'sign-up':
//                 if(pri.method === 'GET'){
//                     tom.end('This is a signup form');
//                 }else if(pri.method === 'POST'){
//                     tom.end('success')
//                 }
//             default: tom.end("Not found"); break;
//         }
//     })
// });

// console.log(myServer);

app.listen(8000, "localhost", 511, ()=>{
    console.log("server started");
});