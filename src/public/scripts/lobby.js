const startGameBtn = document.getElementById('startGameBtn')
const gameCodeInput = document.getElementById('gameCodeInput')
let username = window.localStorage.getItem('username')
let code = 0
const gameMode = ''

fetch('/api/Codes')
  .then(function (response) {
    if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
  })
  .then(function (data) {
    code = data
    // populate the heading with game code
    const GameCode = document.getElementById('GameCode')
    const heading = document.createElement('H2')
    const display = 'Game Code: ' + String(code)
    const text = document.createTextNode(display)
    heading.appendChild(text)
    GameCode.appendChild(heading)
  })
  .catch(function (e) {
    console.log(e)
  })

fetch('/api/Mode')
  .then(function (response) {
    if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
  })
  .then(function (data) {
    code = data
    // populate the heading with game mode
    const GameCode = document.getElementById('GameMode')
    const heading = document.createElement('H2')
    const display = 'Game Mode: ' + String(code)
    const text = document.createTextNode(display)
    heading.appendChild(text)
    GameCode.appendChild(heading)
  })
  .catch(function (e) {
    console.log(e)
  })

fetch('/api/multiUsers')
  .then(function (response) {
    if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
  })
  .then(function (data) {
    // populate the list
    const playerlist = document.getElementById('allPlayers')
    data.forEach(function (players) {
      const li = document.createElement('LI')
      const liText = document.createTextNode(players)
      li.appendChild(liText)
      playerlist.appendChild(li)
    })
  })
  .catch(function (e) {
    console.log(e)
  })

let mode = ''
fetch('/api/Mode')
  .then(function (response) {
    if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
  })
  .then(function (data) {
    mode=data[0]
  })
  .catch(function (e) {
    console.log(e)
  })


fetch('/api/multiUsers')
  .then(function (response) {
    if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
  })
  .then(function (data) {
    const index=data.indexOf(username)
    console.log(index)
    if ((data.length === 3) && (mode==='A')) {
      startGameBtn.addEventListener('click', function() {
        if (index === 0) {
          window.location.replace('/guessWord')
        } else {
          window.location.replace('/setWord')
        }
      })
    }
    else if ((data.length === 2) && (mode==='B')) {
      startGameBtn.addEventListener('click', function() {
        window.location.replace('/randomWordMode')
      })
    }
  })
  .catch(function (e) {
    console.log(e)
  })