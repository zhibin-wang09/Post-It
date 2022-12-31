const express = require('express')
const router = express.Router()
const {getAllNote,
    postNote,
    deleteNote,
    updateNote} = require('../controller/cntrl.js')

router.route("/new").post(postNote) //Create a new note
router.route('/note').get(getAllNote) //Get all
router.route('/note/:id').delete(deleteNote).patch(updateNote) //Access individual notes with delete and update functionality

module.exports = router