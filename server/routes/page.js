const express = require('express')
const router = express.Router()

//Homepage route
router.get('/', (req, res) => {
    res.render("home")
})

// Apis
router.get("/api", (req,res) => {
    res.render("api.ejs");
})

// Documentation
router.get("/docs", (req,res) => {
    res.render("doc.ejs");
})

// Contact
router.get("/contact", (req,res) => {
    res.render("contact.ejs");
})

module.exports = router;