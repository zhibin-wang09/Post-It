/**
 * This is the controller of the application, where it contains the 
 * logic of the application and manipulates or updates the model. Base
 * on the user input received from the view.
 * 
 * 
 */


const note = require('../model/note.model.js')


const getAllNote = async (req,res)=> {
    try {
        const data = await note.find({userId: req.identifier})
        res.status(200).json({msg:"Get success", notes: data})
    } catch (error) {
        res.status(400).json({msg:"Failed",error:error})
    }
}

const postNote = async (req,res) => {
   try {
        const title = req.body.title
        const noteContent = req.body.note
        const createdNote = await note.create({
            userId: req.identifier,
            title:title, 
            note:noteContent,
            webaddress: req.body.webaddress
        })
        res.status(200).json({msg:"Success", _id:createdNote._id})
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
    try {
        await note.updateOne({_id:req.params.id},{
            title:req.body.title,
            note:req.body.note})
        res.status(200).json({msg:"Patch success"})
    } catch (error) {
        res.status(400).json({msg:"Failed",error:error})
    }
    
}

module.exports = {getAllNote,
                    postNote,
                    deleteNote,
                    updateNote}