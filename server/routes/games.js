const express = require('express')
const router = express.Router()

router.get('/n-queen', (req, res) => {
    res.render("nQueen.ejs")
})

router.get('/guess', (req, res) => {
    res.render("guess.ejs")
})

router.get('/change-word', (req, res) => {
    res.render("changeWord.ejs")
})

module.exports = router;