const {getUser} = require('../service/auth.js');

function checkForAuthentication(req, res, next){
    const authHeaderVal = req.headers['authorization'];
    req.user = null;
    if(!authHeaderVal || !authHeaderVal.startsWith('Bearer')){
        return next();
    }

    const token = authHeaderVal.split('Bearer ')[1];
    getUser(token);

    req.user = user;
    next();
}

function restrictTo(roles){
    return function(req, res, next){
        if(!req.user) return res.redirect('/login');

        if(roles.includes(req.user.role)){
            return res.end("Unauthorized")
        }

        return next();
    }
}

async function restrictToLoggedInUserOnly(req, res, next) {
    const userId = req.headers['authorization'];

    if(!userId) return res.redirect('/login');
    const token = userId.split('Bearer ')[1];
    const user = getUser(token);

    if(!user) return res.redirect('/login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userId = req.headers['authorization'];
    const token = userId.split('Bearer ')[1];
    const user = getUser(token);

    req.user = user;
    next();
}



module.exports = {checkForAuthentication, restrictTo};