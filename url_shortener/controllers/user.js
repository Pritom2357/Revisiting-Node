const User = require('../models/user.js');
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth.js')

const handleUserSignup = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        await User.create({
            name,
            email,
            password
        });

        
        return res.redirect("/")
    } catch (error) {
        
    }
}

const handleUserLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email, password});

        if(!user){
            return res.render('login', {
                error: "Invalid email or password"
            });

        }
        const token = setUser(user);
        res.cookie("uid", token);
        return res.redirect("/")
    } catch (error) {
        
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}