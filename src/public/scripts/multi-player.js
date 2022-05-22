function makeRows (row, col) {
  container.style.setProperty('--grid-row', row)
  container.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    container.appendChild(cell).className = 'gameGrid-item'
  };
};

function makeOpponentRows (row, col) {
  opponent.style.setProperty('--grid-row', row)
  opponent.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    opponent.appendChild(cell).className = 'opponentGrid-item'
  };
};
function makeOpponentGrids (row, col, numOpponents) {
  for (i = 0; i < numOpponents; i++) {
    makeOpponentRows(row, col)
  }
}

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

mode1.addEventListener('click', function () {
  mode1.style.display = 'none'
  mode2.style.display = 'none'
  current_mode.style.display = 'none'
  choose_play.style.display = 'none'
  a_mode.style.display = 'initial'
  hOpponent.style.display = 'initial'
  makeRows(6, 5)
  makeOpponentGrids(6, 5, 1)
}, false)

mode2.addEventListener('click', function () {
  mode1.style.display = 'none'
  mode2.style.display = 'none'
  current_mode.style.display = 'none'
  choose_play.style.display = 'none'
  b_mode.style.display = 'initial'
  hOpponent.style.display = 'initial'
  makeRows(6, 5)
  makeOpponentGrids(6, 5, 1)
}, false)
