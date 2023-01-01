const mongoose = require('mongoose')
const schema = require('../model/mongoose.js')

const getAllNote = async (req,res)=> {
    res.status(200).json({msg:"success"})
}

const postNote = async (req,res) => {
    res.status(200).json({msg:"success", body: req.body})
}

const deleteNote = async (req,res) => {
    res.status(200).json({msg:"success"})
}

const updateNote = async (req,res) => {
    res.status(200).json({msg:"success"})
}

module.exports = {getAllNote,
                    postNote,
                    deleteNote,
                    updateNote}