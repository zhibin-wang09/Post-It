const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    },
     webaddress : {
        type: String
    }
})

module.exports = mongoose.model('note',noteSchema)