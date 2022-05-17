const path = require('path')
const express = require('express')
const mainRouter = express.Router()

function isCookie(req) {
    const cookies = req.headers.cookie
    const all_cookies = cookies.split('; ');
    return all_cookies.some(e => e.includes("username="))
}

mainRouter.get('/', function (req, res) {
    if (isCookie(req)) {
        res.sendFile(path.join(__dirname, 'views', 'class', 'index.html'))
    }
    else {
        res.redirect('/login')
    }
})

mainRouter.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'class', 'login.html'))
})

mainRouter.get('/single', function (req, res) {
    if (isCookie(req)) {
        res.sendFile(path.join(__dirname, 'views', 'class', 'single-player.html'))
    }
    else {
        res.redirect('/login')
    }
})

mainRouter.get('/multiplayer', function (req, res) {
    if (isCookie(req)) {
        res.sendFile(path.join(__dirname, 'views', 'class', 'multi-player.html'))
    }
    else {
        res.redirect('/login')
    }
})

mainRouter.get('/rules', function (req, res) {
    if (isCookie(req)) {
        res.sendFile(path.join(__dirname, 'views', 'class', 'rules.html'))
    }
    else {
        res.redirect('/login')
    }
})

module.exports = mainRouter
