/**
 * This controller manages all the sign in, sign up, sign out requests from the user 
 */

const chrome = window.chrome

const user = require("../model/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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

    // create a jwt token
    const token = jwt.sign({id: userInDB._id}, 
                            config.secret,
                            {
                                algorithm: 'HS256',
                                // allowInsecureKeySizes: true,
                                // expiresIn: 86400*30
                            })
    const identifier = jwt.sign({user: userInDB._id},
                                config.secret,
                                {
                                    algorithm : 'HS256',
                                    noTimestamp: true
                                })
    if(chrome){
        const tokenOption = {
            name: 'access-token',
            value: token,
            expirationDate: Math.floor((Date.now() / 1000) + (60 * 60 * 24 * 30)), // Set the expiration date
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            };
        chrome.cookies.set(tokenOption, (cookie) => {
            if(cookie) {
                console.log("Cookie set success")
            }else{
                console.log("Failed to set cookie")
            }
        })

        const identifierOption = {
            name: 'identifier',
            value: identifier,
            expirationDate: Math.floor((Date.now() / 1000) + (60 * 60 * 24 * 30)),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        };    
        
        chrome.cookies.set(identifierOption, (cookie) => {
            if (cookie) {
              console.log('identifier cookie set successfully');
            } else {
              console.error('Failed to set the identifier cookie');
            }
        });
    }else{
        res.cookie("access-token", token, {
            maxAge : 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        res.cookie("identifier", identifier, {
            maxAge : 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
    }
    res.status(200).send({message: "Logged in"})
}

signout = async(req, res) => {
    try{
        res.clearCookie("access-token")
        res.clearCookie("identifier")
        req.session = null
        return res.status(200).send({message: "You have been signed out!"})
    }catch(err){
        this.next(err);
    }
}

module.exports = {signup, signin, signout}