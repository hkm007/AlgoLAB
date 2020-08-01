const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const apiRoute = require('./routes/api')
const pageRoute = require('./routes/page')
const BASE_DIR = './'
const port = process.env.PORT || 5000

// public
app.use(express.static(BASE_DIR + 'public/')); 

// parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// views
app.set('views', 'views')
app.set('view engine', 'ejs')

// routes
app.use(apiRoute)
app.use(pageRoute)

app.listen(port, () => console.log(`Server running at port ${port}`))