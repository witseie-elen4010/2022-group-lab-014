const container2 = document.getElementById('container2')
const container1 = document.getElementById('container1')
const container3 = document.getElementById('container3')
const num_of_players = 3
function makeRows (row, col) {
  container1.style.setProperty('--grid-row', row)
  container1.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    container1.appendChild(cell).className = 'opp1Grid-item'
  };
};

function makeRows2 (row, col) {
  container2.style.setProperty('--grid-row', row)
  container2.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    container2.appendChild(cell).className = 'opp2Grid-item'
  };
};

function makeRows3 (row, col) {
  container3.style.setProperty('--grid-row', row)
  container3.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    container3.appendChild(cell).className = 'opp3Grid-item'
  };
};

const hOpponent1 = document.getElementById('hOpponent1')
const hOpponent2 = document.getElementById('hOpponent2')
hOpponent1.style.display = 'none'
hOpponent2.style.display = 'none'

if (num_of_players == 3) {
  makeRows2(6, 5)
  makeRows(6, 5)
  fetch('/api/multiUsers')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
    })
    .then(function (data) {
      let count = 0
      data.forEach(function (players) {
        if (count === 1) {
          hOpponent1.innerHTML = players
        } else if (count === 2) {
          hOpponent2.innerHTML = players
        }
        count += 1
      })
    })
    .catch(function (e) {
      console.log(e)
    })
  hOpponent1.style.display = 'initial'
  hOpponent2.style.display = 'initial'
}
