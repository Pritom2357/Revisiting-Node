const express = require('express');
const urlRoute = require('./routes/url.js');
const {staticRouter} = require('./routes/staticRoutes.js');
const userRoutes = require('./routes/user.js')
const {connectDB} = require('./connect.js');
const URL = require('./models/url.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const {checkForAuthentication, restrictTo} = require('./middlewares/auth.js')

const app = express();
const PORT = 8001;

connectDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log("DB connected"));

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(checkForAuthentication)

app.use('/url', restrictTo(["NORMAL"]), urlRoute);
app.use('/',  staticRouter);
app.use('/user', userRoutes);

app.get('/test', async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render('urls', {
        urls: allUrls
    });
});


app.listen(PORT, ()=> console.log(`Server started at: http://localhost:${PORT}`));
