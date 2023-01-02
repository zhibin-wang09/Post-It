const mongoose = require('mongoose')
const note = require('../model/mongoose.js')


const getAllNote = async (req,res)=> {
    try {

        const data = await note.find({})
        res.status(200).json({msg:"Get success", notes: data})
    } catch (error) {
        console.log(error)
    }
}

const postNote = async (req,res) => {
   try {
        const title = req.body.title
        const noteContent = req.body.note
        await note.create({
            title:title, 
            note:noteContent})
        res.status(200).json({msg:"Success", })
   } catch (error) {
        console.log(error)
   }
}

const deleteNote = async (req,res) => {
    res.status(200).json({msg:"Delete success"})
}

const updateNote = async (req,res) => {
    res.status(200).json({msg:"Put success"})
}

module.exports = {getAllNote,
                    postNote,
                    deleteNote,
                    updateNote}