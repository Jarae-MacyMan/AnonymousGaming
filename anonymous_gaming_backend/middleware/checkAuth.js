const { verifyToken } = require('../util/jwtGenerator.js');


const authCheck = (req, res, next) => {
    //next = middlewear
    const headers = req.headers
    const authHeader = headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            data: "NOT AUTHORIZED"
        });
    }

    const authToken = authHeader.split(" ")[1];
    
    if(!authToken){
        return res.status(401).json({
            data: "NOT AUTHORIZED"
        })
    }

    let decodedToken
    try{
        decodedToken = verifyToken(authToken);
        req.user = decodedToken.user
    } catch(error){
        console.log(error.message);
        return res.status(401).json({
            data: "Not Authorized",
        })
    }
    next()
};

module.exports = authCheck;