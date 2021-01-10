const express = require('express')
const path = require('path')
const port = 8080
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(require('router.js'))

app.use(express.static(path.join('')))

app.listen(port, () => console.log(`Running on port ${port}, Ojou-sama!`))