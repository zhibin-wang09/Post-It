const express = require('express')
const router = express.Router()
const controll = require('../controller/cntrl.js')

router.route("/new").post() //Create a new note
router.route('/').get() //Get all
router.route('/:id').get().delete().patch() //Access individual notes

module.exports = router