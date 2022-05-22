function makeRows (row, col) {
  container.style.setProperty('--grid-row', row)
  container.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (let i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('id', 'cell' + i)
    container.appendChild(cell).className = 'gameGrid-item'
  };
};

function makeOpponentRows (row, col) {
  opponent.style.setProperty('--grid-row', row)
  opponent.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (let i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    opponent.appendChild(cell).className = 'opponentGrid-item'
  };
};
function makeOpponentGrids (row, col, numOpponents) {
  for (let i = 0; i < numOpponents; i++) {
    makeOpponentRows(row, col)
  }
}

function makeKeyboard (KeyRow) {
  const keyboard = document.getElementById('keyboard')
  const newDiv = document.createElement('div')
  newDiv.className = 'row align-items-center'
  if (KeyRow[0] === 'Q') {
    newDiv.style = 'margin-top:100px'
  }
  for (let i = 0; i < KeyRow.length; i++) {
    const key = document.createElement('button')
    key.setAttribute('id', KeyRow[i])
    key.type = 'button'
    key.className = 'col-sm btn btn-light btn btn-outline-dark'
    key.innerHTML = KeyRow[i]
    newDiv.appendChild(key)
    keyboard.appendChild(newDiv)
  }
};

function KeysInGrid (KeyRow, cellCount) {
  let count = 0
  let currentRow = 0
  while (count !== 3) {
    for (let j = 0; j < KeyRow[count].length; j++) {
      const inKey = document.getElementById(KeyRow[count][j])
      inKey.addEventListener('click', function () {
        if ((inKey.innerHTML !== 'DELETE')) {
          if (Math.floor(cellCount / 5) === currentRow && inKey.innerHTML !== 'ENTER') {
            const cell = document.getElementById('cell' + (cellCount))
            cell.innerHTML = inKey.innerHTML
            cellCount = cellCount + 1
          } else if (inKey.innerHTML === 'ENTER' && cellCount % 5 === 0) {
            if (Math.floor(cellCount / 5) !== currentRow) {
              currentRow += 1
            }
          }
        } else if (inKey.innerHTML == 'DELETE' && cellCount > 0) {
          cellCount = cellCount - 1
          document.getElementById('cell' + cellCount).innerHTML = ''
        }
      }, false)
    }
    count = count + 1
  }
};

const firstRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondRowKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdRowKeys = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
const RowOfKeys = [firstRowKeys, secondRowKeys, thirdRowKeys]

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
  const cellCount = 0
  makeRows(6, 5)
  makeKeyboard(firstRowKeys)
  makeKeyboard(secondRowKeys)
  makeKeyboard(thirdRowKeys)
  KeysInGrid(RowOfKeys, cellCount)
  makeOpponentGrids(6, 5, 1)
}, false)

mode2.addEventListener('click', function () {
  mode1.style.display = 'none'
  mode2.style.display = 'none'
  current_mode.style.display = 'none'
  choose_play.style.display = 'none'
  b_mode.style.display = 'initial'
  hOpponent.style.display = 'initial'
  const cellCount = 0
  makeRows(6, 5)
  makeKeyboard(firstRowKeys)
  makeKeyboard(secondRowKeys)
  makeKeyboard(thirdRowKeys)
  KeysInGrid(RowOfKeys, cellCount)
  makeOpponentGrids(6, 5, 1)
}, false)
