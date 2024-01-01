/**
 * This controller manages all the sign in, sign up, sign out requests from the user 
 */


const user = require("../model/user.model.js")
const bcrypt = require("bcryptjs")
const config = require("../config/auth.config.js")

signup = async (req,res) => {
    try{
        const {username, email, password} = req.body
        const hash = await bcrypt.hash(password,10)
        await user.create({
            username: username,
            email : email,
            password: hash, 
        })
        res.status(200).json({message: "User created successfully!"})
    }catch(err){
        res.status(400).send({message: err})
    }
}

signin = async (req,res) => {
    const {username,password, role} = req.body

    const userInDB = await user.findOne({username: username})
    if(!userInDB){
        res.status(400).send({message: "User not found!"})
        return
    }
    // check password
    const isPasswordValid = bcrypt.compareSync(password, userInDB.password)
    if(!isPasswordValid){
        res.status(400).send({message: "Invalid password!"})
        return
    }
    req.session.identifier = userInDB._id.toString();
    console.log("signin",req.session.identifier);
    res.status(200).send({message: "Logged in"})
}

signout = async(req, res) => {
    try{
        req.session.destroy(function (err){
            if(err) res.status(400).send(err);
        });
        return res.status(200).send({message: "You have been signed out!"})
    }catch(err){
        this.next(err);
    }
}

module.exports = {signup, signin, signout}