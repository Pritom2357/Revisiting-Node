const express = require('express');
const URL = require('../models/url.js');
const { restrictTo } = require('../middlewares/auth.js');

const staticRouter = express.Router();

staticRouter.get('/', restrictTo(["NORMAL"]), async(req, res)=>{
    if(!req.user) return res.redirect('/login');
    console.log("request: " + req.user);
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render('home', {
        urls: allUrls
    })
});

staticRouter.get('/signup', async(req, res)=>{
    return res.render('signup');
});
staticRouter.get('/login', (req, res)=>{
    return res.render('login')
})

module.exports = {
    staticRouter
}