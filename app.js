const express = require('express')
const router = require('./router/route.js')
const connection = require('./database/connect.js')
const dotenv = require('dotenv').config()
const app = express()
const PORT = 8080
const URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.qwweo4r.mongodb.net/notes?retryWrites=true&w=majority`
//parse incoming request to json format
app.use(express.json())
app.use("/api/v1",router)

const start = async (uri) => {
    try {
        await connection(uri)
        console.log("Connected to database")
        app.listen(PORT, (err)=>{
            if(err) console.log(err)
            console.log(`Listening on port ${PORT} at http://localhost:${PORT}...`)
        })
    } catch (error) {
    }
}

start(URI)