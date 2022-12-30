const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    title : String,
    note: String
})

module.exports = noteSchema.model('note',noteSchema)