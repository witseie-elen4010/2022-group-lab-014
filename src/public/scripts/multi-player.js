const mode1 = document.getElementById('mode1')
const mode2 = document.getElementById('mode2')
const current_mode = document.getElementById('current_mode')
const choose_play = document.getElementById('choose_play')
const a_mode = document.getElementById('a_mode')
a_mode.style.display = 'none'
const b_mode = document.getElementById('b_mode')
b_mode.style.display = 'none'
const hOpponent = document.getElementById('hOpponent')
hOpponent.style.display = 'none'

mode1.addEventListener('click', function () { // a
  window.replace('/startRoom')
}, false)

mode2.addEventListener('click', function () { // b
  window.replace('/startRoom')
}, false)
