const cluster = require('node:cluster');
const os = require('os');
const express = require('express')

const totalCPUs = os.cpus().length;

// console.log(totalCPUs);

if(cluster.isPrimary){
    for(let i=0; i<totalCPUs; i++){
        cluster.fork();
    }
} else{
    const app = express();
    
    app.get('/', (req, res)=>{
        return res.json({
            message: `Hello from Express Server ${process.pid}`
        });
    })

    app.listen(8000, ()=>{
        console.log(`Server running at: http://localhost:8000`);
        
    })
}
