const startGameBtn = document.getElementById('startGameBtn')
const gameCodeInput = document.getElementById('gameCodeInput')
const username = ''
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

// getting player username
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

