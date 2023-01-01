const mongoose = require('mongoose')
const note = require('../model/mongoose.js')


const getAllNote = async (req,res)=> {
    const data = await note.find({})
    res.status(200).json({msg:"Get success", notes: data})
}

const postNote = async (req,res) => {
    
    res.status(200).json({msg:"Post success"})
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