const express = require('express')
const router = express.Router()
const {getAllNote,
    postNote,
    deleteNote,
    updateNote} = require('../controller/cntrl.js')
router.route('/').get(getAllNote).post(postNote)
router.route('/api/v1/notes') //Create a new note //Get all
router.route('/api/v1/note/:id').delete(deleteNote).patch(updateNote) //Access individual notes with delete and update functionality

module.exports = router