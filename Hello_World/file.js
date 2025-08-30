const { error } = require('console');
const fs = require('fs');

// asynchronous ... Non-Blocking
// fs.writeFile('./test.txt', 'I am Pritom and I am not Batman', (err)=>{
//     if(err) throw err;
//     console.log("file has been saved");
// });

// synchronous ... Blocking
// fs.writeFileSync('./text.txt', " I am Pritom");

const result = fs.readFileSync('./contact.txt', "utf-8");

// asynchronous does not return anything
fs.readFile('./contact.txt', "utf-8", (err, result)=>{
    if(err) throw err;
    console.log(result);
    
});
console.log(result);

// fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString()+'\n');


fs.cpSync('./test.txt', './copy.txt');
// fs.unlinkSync('./copy.txt');
// const stat = fs.statSync('./test.txt');
// console.log(stat);

fs.mkdirSync('my-docs/a/b', {recursive:true});
