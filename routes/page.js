const express = require('express')
const router = express.Router()

//Home
router.get('/', (req, res) => {
    res.render("home")
})

// Docs
router.get("/docs", (req,res) => {
    res.render("docs.ejs");
})

module.exports = router;