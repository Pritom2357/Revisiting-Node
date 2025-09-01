const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: false}));
app.use((req, res, next)=>{
    // console.log('Hello I am a middleware');
    // return res.json({
    //     message: "mra kha tui"
    // })

    fs.appendFile('./log.txt', `${Date.now().toString()}: ${req.method}: ${req.path} \n`, (err)=>{
        if(err) throw err;
    });
    next();
});

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:3000");
});

app.get('/api/users', (req, res)=>{
    res.json(users);
});

app.get('/users', (req, res)=>{
    const html = `
    <ul>
        ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;

    res.send(html);
});

app.get('/api/users/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const user = users.find(user=> user.id === id);
    return res.json(user);
});

app.post('/api/users', (req, res)=>{
    const body = req.body;
    console.log(body);
    
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        return res.json({
            status: "done for Mr. " + body.first_name
        })
    })
});

app.patch('/api/users/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    const body = req.body;

    if(userIndex === -1){
        res.json({
            status: "failed",
            message: "no user found"
        });
    }

    users[userIndex] = {...users[userIndex], ...body};

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        if(err) throw err;
        else{
            res.json({
                status: "success",
                message: "updated for user: " + (userIndex+1)
            });
        }
    })
});

app.delete('/api/users/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    const body = req.body;

    if(userIndex === -1){
        res.json({
            status: "failed",
            message: "no user found"
        });
    }

    users.splice(userIndex, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        if(err) throw err;
        else{
            res.json({
                status: "success",
                message: "deleted user: " + (userIndex+1)
            });
        }
    });
})