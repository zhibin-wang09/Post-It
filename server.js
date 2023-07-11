/**
 * This file is the file that starts the mongodb server and the local host server. 
 * This allows any request to the localhost or whatever URL the server is hosted on
 * to be able to handle request from the user.
 */
const express = require('express')
const router = require('./router/route.js')
const db = require('./database/connect.js')
const cookieSession = require('cookie-session')
var bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')
const PORT = 5500
const URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.qwweo4r.mongodb.net/notes?retryWrites=true&w=majority`
//parse incoming request to json format
//app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(express.static("./public"))
app.use(express.json())
app.use(cors())
app.use(cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET], // should use as secret environment variable
    httpOnly: true
})) 
app.use("/",router)

const start = async (uri) => {
    try {
        await db.connect(uri)
        console.log("Connected to database")
        app.listen(PORT, (err)=>{
            if(err) console.log(err)
            console.log(`Listening on port ${PORT} at http://localhost:${PORT}...`)
        })
    } catch (error) {
        console.log("Failed to connect to database")
    }
}

start(URI)