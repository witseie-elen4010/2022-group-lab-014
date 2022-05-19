const express = require('express')
const app = express()

const mainRouter = require('./mainRoutes.js')

app.use('/', mainRouter)
app.use('/cdn', express.static('public'))

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server listening on port ', port)
