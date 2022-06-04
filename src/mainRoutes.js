const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const dict = require('./dictionary.js')
const db = require('./db.js')
let guessWord1=''

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
mainRouter.get('/guessWord', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'multi-player-guessWord.html'))
})

mainRouter.get('/api/answer', function (req, res) {
  res.send(JSON.stringify([dict.todayWord(Math.floor(Math.random() * 2309))]))
})

mainRouter.get('/api/isValid', function (req, res) {
  res.send(JSON.stringify(dict.getJSON()))
})

mainRouter.post('/api/database', function (req, res) {
  const name = req.body.user
  db.pools
    .then((pool) => {
      return pool.request()
        .query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err, result) {
          if (err) throw err
          if (result.recordset.length !== 0) {
            mainRouter.get('/api/user', function (req, res) {
              res.send(result.recordset[0])
            })
          } else {
            pool.query("INSERT INTO [dbo].[Users] (username, games_played, games_won) VALUES ('" + name + "', 0, 0)", function (err, result) {
              if (err) throw err
              pool.query("SELECT * FROM [dbo].[Users] WHERE username='" + name + "'", function (err, result) {
                if (err) throw err
                mainRouter.get('/api/user', function (req, res) {
                  res.send(JSON.stringify(result.recordset[0]))
                })
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
  db.pools
    .then((pool) => {
      return pool.request()
        .query("UPDATE [dbo].[Users] SET games_played=" + String(played) + ", games_won=" + String(won) + "WHERE username='" + name + "';", function (err, result) {
          if (err) throw err
          
        })
    })
})


mainRouter.post('/api/guessWord', function (req, res) {
  guessWord1 = req.body.guessWord
  if (dict.validWord(guessWord1)) {
    res.redirect('/')
  } else {
    res.redirect('/guessWord')
  }
  // console.log(guessWord1)
  // console.log(guessWord1)
})
mainRouter.get('/api/fetchGuessWord', function (req, res) {
  res.send(guessWord1)
})


module.exports = mainRouter
