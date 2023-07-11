/**
 * This middleware ensures that during signup the information provided is valid. This middleware
 * should only be applied to the signup path.
 * 
 * Things such as: 
 * • Check for duplicate username or emails 
 */

const db = require('../database/connect.js')
const User = db.user
const ROLES = db.ROLES

/**
 * This function is a middleware that exist in the api endpoint of 
 * registration. It checks if the registration is valid, i.e. no 
 * conflicts with the existing users in the database.
 */
checkDuplicateUsernameOrEmail = (req,res,next)  => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err){
            res.status(400).send({message: err})
            return
        }
        if(user){
            res.status(400).send({messge:"Failed! User with the input username already exist!"})
            return
        }

        //also find any matching emails
        User.findOne({email: req.body.email}).exec((err, user) => {
            if(err){
                res.status(400).send({message: err})
                return
            }

            if(user){
                res.status(400).send({message:"Failed! User with input email already exist!"})
                return
            }

            next()
        })
    })
}

// /**
//  * This function is a middleware that exist in the registration api endpoint
//  * where it will check the sign up user provided an valid role for the account.
//  */
// checkRoleExisted = (req,res,next) => {
//     if(req.body.roles){
//         /* check if the roles of the user match any of our roles
//          row of the user is an array because a user can be both mod or admin or user*/
//         for(let i = 0; i < req.body.roles.length;i++){
//             if(!ROLES.includes(req.body.roles[i])){
//                 res.status(400).send({message: `Failed! Role ${req.body.roles[i]} does not exist!`})
//                 return
//             }
//         }
//     }

//     next();
// }

module.exports = {checkDuplicateUsernameOrEmail}