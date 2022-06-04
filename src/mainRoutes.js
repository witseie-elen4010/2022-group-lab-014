const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const dict = require('./dictionary.js')
const db = require('./db.js')
let guessWord1=''
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
mainRouter.get('/randomWordMode', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'multi-player-random.html'))
})
mainRouter.get('/rules', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'rules.html'))
})

mainRouter.get('/guessWord', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'multi-player-guessWord.html'))
})

mainRouter.get('/observer', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'multi-player-observer.html'))
})

mainRouter.get('/startRoom', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'startRoom.html'))
})

mainRouter.get('/lobby', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'lobby.html'))
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

mainRouter.post('/api/database', function (req, res) {
  const name = req.body.user
  db.pools
    .then((pool) => {
      return pool.request()
        .query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err1, result1) {
          if (err1) throw err1
          if (result1.recordset.length !== 0) {
            userdetails.username = result1.recordset[0].username
            userdetails.games_played = result1.recordset[0].games_played
            userdetails.games_won = result1.recordset[0].games_won
          } else {
            pool.query("INSERT INTO [dbo].[Users] (username, games_played, games_won) VALUES ('" + name + "', 0, 0)", function (err2, result2) {
              if (err2) throw err2
              pool.query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err3, result3) {
                if (err3) throw err3
                userdetails.username = result3.recordset[0].username
                userdetails.games_played = result3.recordset[0].games_played
                userdetails.games_won = result3.recordset[0].games_won
              })
            })
          }
          res.redirect('/')
        })
    })
})

mainRouter.post('/api/gamesWon', function (req, res) {
  const name = req.body.username
  const played = req.body.games_played
  const won = req.body.games_won
  userdetails.username = name
  userdetails.games_played = played
  userdetails.games_won = won
  db.pools
    .then((pool) => {
      return pool.request()
        .query('UPDATE [dbo].[Users] SET games_played=' + String(played) + ', games_won=' + String(won) + "WHERE username='" + name + "';", function (err, result) {
          if (err) throw err
        })
    })
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


module.exports = mainRouter
