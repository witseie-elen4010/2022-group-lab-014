const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const dict = require('./dictionary.js')
const lobbycode = require('./code.js')

const userdetails = {
  username: 'NO LOG IN',
  games_played: 0,
  games_won: 0
}

const multiPlayerUsers = []

const code = lobbycode.gameCode(Math.floor(Math.random() * 4))
let userIn = 0
let modes = 'x'
let guessWord1 = ''

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

mainRouter.get('/startRoom', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'startRoom.html'))
})

mainRouter.get('/lobby', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'lobby.html'))
})

mainRouter.get('/api/answer', function (req, res) {
  let date = new Date()
  date.setHours(0,0,0,0)
  date = parseInt(date / 1000)
  res.send(JSON.stringify([dict.todayWord(Math.floor(date % 2309))]))
})

mainRouter.get('/api/isValid', function (req, res) {
  res.send(JSON.stringify(dict.getJSON()))
})

mainRouter.get('/api/user', function (req, res) {
  res.send(JSON.stringify(userdetails))
})

// This renders the code for the game
mainRouter.get('/api/Codes', function (req, res) {
  res.send(JSON.stringify([code]))
})
// This renders the mode for the game
mainRouter.get('/api/Mode', function (req, res) {
  res.send(JSON.stringify([modes]))
})

// this selects the game mode
mainRouter.post('/api/multiMode', function (req, res) {
  modes = req.body.mode
  res.redirect('/startRoom')
})

// This checks a user's code matches the necessary lobby code
mainRouter.post('/api/userInputCode', function (req, res) {
  userIn = req.body.UserInput
  if ((userIn === String(code)) && (multiPlayerUsers.length < 3)) {
    multiPlayerUsers.push(userdetails.username)
    res.redirect('/lobby')
  } else {
    console.log('Code invalid or Lobby is full') // Change this to an alert
    res.redirect('/startRoom')
  }
})

mainRouter.post('/api/createGame', function (req, res) {
  if (multiPlayerUsers.length === 0) {
    multiPlayerUsers.push(userdetails.username)
    res.redirect('/lobby')
  } else {
    res.redirect('/startRoom')
  }
})

mainRouter.get('/api/multiUsers', function (req, res) {
  res.send(JSON.stringify(multiPlayerUsers))
})

mainRouter.post('/api/guessWord', function (req, res) {
  guessWord1 = req.body.guessWord
  if (dict.validWord(guessWord1)) {
    res.redirect('/observer')
  } else {
    res.redirect('/guessWord')
  }
})
mainRouter.get('/api/fetchGuessWord', function (req, res) {
  res.send(guessWord1)
})

let colArr1 = Array(30).fill('opp2Grid-item')

mainRouter.post('/api/fetchColour1', function (req, res) {
  colArr1 = req.body.colours
})

mainRouter.get('/api/sendColour1', function (req, res) {
  res.send(colArr1)
})

let colArr2 = Array(30).fill('opp2Grid-item')

mainRouter.post('/api/fetchColour2', function (req, res) {
  colArr2 = req.body.colours
})

mainRouter.get('/api/sendColour2', function (req, res) {
  res.send(colArr2)
})

module.exports = mainRouter
