/**
 * This file contains the top level logic for the REST api. 
 * Where it invokes the appropriate CRUD operation base on the 
 * URL and query. 
 */
const express = require('express')
const router = express.Router()
const middleware = require('../middleware/middlewares.js')
const {getAllNote,
    postNote,
    deleteNote,
    updateNote} = require('../controller/note.cntrl.js')
const {signup, signin, signout} = require("../controller/auth.cntrl.js") // controllers for signin functions
const auth = middleware.authJwt.verifyToken
const checkSignup = middleware.verifySignUp.checkDuplicateUsernameOrEmail
router.route('/note').get(auth,getAllNote).post(auth,postNote)
//router.route('/api/v1/notes') //Create a new note //Get all
router.route('/note/:id').delete(auth,deleteNote).patch(auth,updateNote) //Access individual notes with delete and update functionality

router.route('/signup').post(checkSignup,signup)
router.route('/signin').post(signin) 
router.route('/signout').post(signout)

module.exports = router