/**
 * This middleware ensures that the user that is currently interacting with the server
 * is authenticated.
 * 
 * Things such as:
 * • verify token
 * • check user roles in database
 */

const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")
const db = require("../database/connect.js")
const User = db.user 

verifyToken = (req,res,next) => {
    let token = req.session.token
    
    if(!token){
        return res.status(403).send({message: "User not authenticated!"})
    }

    jwt.verify(token, config.secret, (err,decoded) =>{
        if(err){
            return res.status(401).send({message: "User is not unauthorized!"})
        }
        req.userId = decoded.userId
        next();
    })
} 

module.exports = {verifyToken}