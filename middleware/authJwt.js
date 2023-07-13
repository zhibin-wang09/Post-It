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
    let token = req.cookies["access-token"]
    let identifier = req.cookies["identifier"]

    if(!token || !identifier){
        return res.status(403).send({message: "User not authenticated!"})
    }

    jwt.verify(token, config.secret, (err,decoded) =>{
        if(err){
            return res.status(401).send({message: "User is not unauthorized!"})
        }
        jwt.verify(identifier, config.secret,(err,decoded) => {
            if(err){
                return res.status(401).send({message: "User is not unauthorized!"})
            }
            req.identifier = decoded.user
        })
        next();
    })
} 

module.exports = {verifyToken}