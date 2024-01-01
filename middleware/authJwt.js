/**
 * This middleware ensures that the user that is currently interacting with the server
 * is authenticated.
 * 
 * Things such as:
 * • verify token
 * • check user roles in database
 */

verifyToken = (req,res,next) => {
    if(req.session.identifier){
        req.identifier = req.session.identifier;
        next();
    }
    return res.status(400).send({message: "Not authorized"});
} 

module.exports = {verifyToken}