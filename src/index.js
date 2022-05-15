const express = require('express')
const app = express()

const mainRouter = require('./mainRoutes.js')

app.use('/', mainRouter)

const port = 3000
app.listen(port)
console.log('Express server listening on port ', port)
