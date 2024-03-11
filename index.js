require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.use("", require('./router/router'))

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
})