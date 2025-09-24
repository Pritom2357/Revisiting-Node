const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = "Pritom@2357"

function setUser(user){
    return jwt.sign({
        _id: user.id,
        email: user.email
    }, secret)
}

function getUser(token){
    if(!token || typeof token !== "string") return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}