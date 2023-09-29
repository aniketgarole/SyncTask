const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY


const auth = async (req, res, next) => {
    try {
        const wholeToken = req.headers.authorization
        if (wholeToken) {
            const token = wholeToken.split(" ")[1]

            jwt.verify(token, JWT_PRIVATE_KEY, function(err, decoded) {
                if (decoded) {
                    // console.log(decoded)
                    req.body.userId = decoded.userId
                    next()
                } else if (err) {
                    console.log("from decoded")
                    res.status(401).json({"msg": "You are not authorized"})
                }
              });
            
        } else {
            console.log("token is not provided")
            res.status(401).json({"msg": "You are not authorized"})
        }
        
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"msg": error.message})
    }
}



module.exports = {auth}