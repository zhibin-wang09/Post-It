/* 
    This is the model of the application, where it defines the data of the application that it is 
    operating on. 
*/
const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
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