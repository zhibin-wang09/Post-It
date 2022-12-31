const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    title : String,
    note: String
})

module.exports = mongoose.model('note',noteSchema)