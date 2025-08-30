const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((pri, tom)=>{ // ideally should be (req, res)
    // console.dir(pri, {depth: null});
    // console.log(tom);

    // console.log(pri.headers);
    // console.log(pri)
    const log = `${Date.now()}: ${pri.url}: New request received\n`;
    const myUrl = url.parse(pri.url, true, true);
    // console.log(myUrl);
    // console.log(myUrl.pathname.split('/')[1]);
    
    if(pri.url == '/favicon.ico') return tom.end()
    fs.appendFile('./log.txt', log,  (err, data)=>{
        if(err) throw err;
        switch(myUrl.pathname.split('/')[1]){
            case '': tom.end("It is home page"); break;
            case 'about': 
                const username = myUrl.query.my_name;
                tom.end(`Hi, ${username}`); 
                break;
            case 'contact-us': tom.end("It is contact-us page"); break;
            default: tom.end("Not found"); break;
        }
    })
});

// console.log(myServer);

myServer.listen(8000, "localhost", 511, ()=>{
    console.log("server started");
})