const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user.js');
const blogRoutes = require('./routes/blog.js');
const checkForAuthenticationCookie = require('./middlewares/authentication.js');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogify')
.then(e=>console.log('DB Connected'))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.use('/user', userRoutes);
app.use('/blog', blogRoutes);

app.get('/', (req, res)=>{
    res.render('home', {
        user: req.user
    })
})

app.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`))