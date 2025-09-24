const {Router} = require('express');
const User = require('../models/user.js')

const router = Router();

router.get('/signin', (req, res)=>{
    return res.render('signin')
});

router.get('/signup', (req, res)=>{
    return res.render('signup');
});

router.post('/signup', async (req, res)=>{
    // console.log(req.body);
    
    const { email, password } = req.body;
    const fullName = req.body.fullName || req.body.fullname;
    await User.create({
      fullName,
      email,
      password
    });

    return res.redirect('/');
});

router.get('/signin', (req, res)=>{
    return res.render('signin')
})

router.post('/signin', async(req, res)=>{
    try {
        const { email, password } = req.body;

        const token = await User.matchPasswordAndGenerateToken(email, password);
        console.log("User: " + JSON.stringify(token));
        
        return res.cookie('token', token).redirect('/');
    } catch (error) {
        res.render('signin', {error: error.message});
    }
});

router.get('/logout', (req, res)=>{
    res.clearCookie('token').redirect('/');
});


module.exports = router;