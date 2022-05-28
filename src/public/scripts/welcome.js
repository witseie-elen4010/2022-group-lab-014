const button1 = document.getElementById('login')
const button2 = document.getElementById('singlePlayButton')
const button3 = document.getElementById('multiPlayButton')

let username = ''
let played = 0

fetch('/api/user')
  .then(function (response) {
    if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
  })
  .then(function (data) {
    username = data.username
    played = data.games_played
    displayName()
  })
  .catch(function (e) {
    console.log(e)
    // alert(e)
  })

button1.addEventListener('click', function () {
  window.location.replace('/login')
}, false)

button2.addEventListener('click', function () {
  window.location.replace('/single')
}, false)

button3.addEventListener('click', function () {
  window.location.replace('/multiplayer')
}, false)

function displayName () {
  const header = document.getElementById('header')
  const heading = document.createElement('h3')
  const name = 'Welcome, ' + username + ', you have played ' + String(played) + ' games in your career'
  const text = document.createTextNode(name)
  heading.appendChild(text).className = ' display-1 position-relative text-white text-center'
  header.appendChild(heading)
}
