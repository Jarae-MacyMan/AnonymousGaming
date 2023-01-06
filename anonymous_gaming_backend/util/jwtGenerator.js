const jwt = require('jsonwebtoken');


const generateToken = (userId) => {
    //send user ID to front end 
    const payload = {
        user: userId,
    };

    return jwt.sign(payload, process.env.SECRET_KEY || 'shh')
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY || 'shh')
}

module.exports = {
    generateToken,
    verifyToken
}