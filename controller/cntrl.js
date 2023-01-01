const mongoose = require('mongoose')
const note = require('../model/mongoose.js')
const ejs = require('ejs')


const getAllNote = async (req,res)=> {
    const collection = await note.find({})
    res.status(200).render('notedisplay',{
        collection : collection
    })
}

const postNote = async (req,res) => {
    
    try {
        const collection = await note.find({})
        const createdNote = await note.create(req.body)
        res.status(200).render('notedisplay',{
            collection : collection
        })
    } catch (error) {
        console.log(error)
    }
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