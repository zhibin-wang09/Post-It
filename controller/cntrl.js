const mongoose = require('mongoose')
const note = require('../model/mongoose.js')


const getAllNote = async (req,res)=> {
    try {
        const data = await note.find({})
        res.status(200).json({msg:"Get success", notes: data})
    } catch (error) {
        res.status(400).json({msg:"Failed",error:error})
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
        res.status(400).json({msg:"Failed",error:error})
   }
}

const deleteNote = async (req,res) => {
    try {
        await note.deleteOne({_id:req.params.id})
        res.status(200).json({msg:"Success"})
    } catch (error) {
        res.status(400).json({msg:"Failed",error:error})
    }
}

const updateNote = async (req,res) => {
    res.status(200).json({msg:"Put success"})
}

module.exports = {getAllNote,
                    postNote,
                    deleteNote,
                    updateNote}