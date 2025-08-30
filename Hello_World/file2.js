const fs = require('fs');
const os = require('os');

console.log(os.cpus().length);


// Blocking ... Synchronous
// console.log("1");

// const result = fs.readFileSync("./contact.txt", "utf-8"); 
// console.log(result);

// console.log("2");


// Non-blocking ... Asynchronous
console.log("1");

fs.readFile("./contact.txt", "utf-8", (err, data)=>{
    if(err) throw err;
    console.log(data);
});

console.log("2");

// Default Thread pool size = 4
// Max? - 8 core - 8