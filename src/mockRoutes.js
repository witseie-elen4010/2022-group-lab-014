const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const dict = require('./dictionary.js')

const userdetails = {
  username: 'NO LOG IN',
  games_played: 0,
  games_won: 0
}

mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'index.html'))
})

mainRouter.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'login.html'))
})

mainRouter.get('/single', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'single-player.html'))
})

mainRouter.get('/multiplayer', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'multi-player.html'))
})

mainRouter.get('/rules', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'rules.html'))
})

mainRouter.get('/api/answer', function (req, res) {
  res.send(JSON.stringify([dict.todayWord(Math.floor(Math.random() * 2309))]))
})

mainRouter.get('/api/isValid', function (req, res) {
  res.send(JSON.stringify(dict.getJSON()))
})

mainRouter.get('/api/user', function (req, res) {
  res.send(JSON.stringify(userdetails))
})

module.exports = mainRouter
