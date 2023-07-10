const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.set('strictQuery', 'true') //strict query


const connection =  async (uri) => {
    await mongoose.connect(uri);
}

const db = {}
db.connect = connection
db.user = require("../model/user.model.js")
db.role = require("../model/role.model.js")
db.ROLES = ["user", "admin" , "moderator"]

module.exports = db