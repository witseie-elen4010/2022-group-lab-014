const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const dict = require('./dictionary.js')

function isCookie (req) {
  const cookies = req.headers.cookie
  if (cookies === undefined) {
    return false
  }
  return !!(cookies.includes('username='))
}

mainRouter.get('/', function (req, res) {
  if (isCookie(req)) {
    res.sendFile(path.join(__dirname, 'views', 'class', 'index.html'))
  } else {
    res.redirect('/login')
  }
})

mainRouter.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'login.html'))
})

mainRouter.get('/single', function (req, res) {
  if (isCookie(req)) {
    res.sendFile(path.join(__dirname, 'views', 'class', 'single-player.html'))
  } else {
    res.redirect('/login')
  }
})

mainRouter.get('/multiplayer', function (req, res) {
  if (isCookie(req)) {
    res.sendFile(path.join(__dirname, 'views', 'class', 'multi-player.html'))
  } else {
    res.redirect('/login')
  }
})

mainRouter.get('/rules', function (req, res) {
  if (isCookie(req)) {
    res.sendFile(path.join(__dirname, 'views', 'class', 'rules.html'))
  } else {
    res.redirect('/login')
  }
})

mainRouter.get('/api/answer', function (req, res) {
  res.send(JSON.stringify([dict.todayWord(Math.floor(Math.random() * 2309))]))
})

module.exports = mainRouter
