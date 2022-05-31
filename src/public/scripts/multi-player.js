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

let inWord = ''

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
            inWord += inKey.innerHTML
          } else if (inKey.innerHTML === 'ENTER' && cellCount % 5 === 0) {
            if (Math.floor(cellCount / 5) !== currentRow) {
              if (isValid(inWord)) {
                checkRight(inWord, currentRow)
                inWord = ''
                currentRow += 1
              } else {
                alert('Your word is invalid.')
              }
            }
          }
        } else if (inKey.innerHTML === 'DELETE' && cellCount > 0) {
          cellCount = cellCount - 1
          document.getElementById('cell' + cellCount).innerHTML = ''
          inWord = inWord.slice(0, -1)
        }
      }, false)
    }
    count = count + 1
  }
};

function isValid (word) {
  console.log(answer)
  return allValid.includes(word.toLowerCase())
}

let chances = 0

function letterToGreen(word, copyAnswer,row){
  for (let i = 0; i < 5; i++){
  if (word[i]==copyAnswer[i]) {
    const cell = document.getElementById('cell' + (i + 5 * row))
    cell.className = 'gameGrid-item bg-success' 
    const key = document.getElementById(word[i].toUpperCase())
    key.className = 'col-sm btn btn-success btn btn-outline-dark'
    copyAnswer=copyAnswer.replace(copyAnswer[i],'0')
    console.log(copyAnswer)
  }
}
}

function letterToOrange(word,copyAnswer,cell,i){
    cell.className = 'gameGrid-item bg-warning'
    const key = document.getElementById(word[i].toUpperCase())
    if (key.className !== 'col-sm btn btn-success btn btn-outline-dark'){
      key.className = 'col-sm btn btn-warning btn btn-outline-dark'
    }
    copyAnswer=copyAnswer.replace(copyAnswer[copyAnswer.indexOf(word[i])],'0')
}

function letterToGrey(word,copyAnswer,cell,i){
  cell.className = 'gameGrid-item bg-secondary'
        const key = document.getElementById(word[i].toUpperCase())
        if (key.className !== 'col-sm btn btn-success btn btn-outline-dark'){
          key.className = 'col-sm btn btn-secondary btn btn-outline-dark'
        }
      copyAnswer=copyAnswer.replace(copyAnswer[copyAnswer.indexOf(word[i])],'0')
}

function checkRight (word, row) {
  copyAnswer = answer
  word = word.toLowerCase()
  letterToGreen(word,copyAnswer,row)
  for (let i = 0; i < 5; i++) {
    const cell = document.getElementById('cell' + (i + 5 * row))
    if (cell.className !== 'gameGrid-item bg-success'){
     if (copyAnswer.indexOf(word[i]) !== -1) {
       letterToOrange(word,copyAnswer,cell,i)
    }
      else if (copyAnswer.indexOf(word[i]) === -1){
        letterToGrey(word,copyAnswer,cell,i)
    }
  }
}
  chances = chances + 1
  let won = 0
  let name = ''
  let played = 0
  if (word === answer) {
    document.querySelector('.popup').style.display = 'block'
    fetch('/api/user')
      .then(function (response) {
        if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
      })
      .then(function (data) {
        won = data.games_won + 1
        name = data.username
        played = data.games_played + 1

        const newData = {
          username: name,
          games_played: played,
          games_won: won
        }

        displayStreak1(won)

        fetch('/api/gamesWon', {
          method: 'post', // specify method to use
          headers: { // headers to specify the type of data needed
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData)
        }) // fill body of request. Here the data is a JSON object })
          .then(function (response) {
            if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid else
            throw 'Failed!'
          })
          .catch(function (e) { // Process error for request
            alert(e) // Displays a browser alert with the error message. // This will be the string thrown in line 7 IF the
          // response code is the reason for jumping to this
          // catch() function.
          })
      })
      .catch(function (e) {
        console.log(e)
      })
  } else if (chances === 6) {
    document.querySelector('.popup2').style.display = 'block'
    fetch('/api/user')
      .then(function (response) {
        if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
      })
      .then(function (data) {
        won = data.games_won
        name = data.username
        played = data.games_played + 1

        const newData = {
          username: name,
          games_played: played,
          games_won: won
        }

        displayStreak2(won)

        fetch('/api/gamesWon', {
          method: 'post', // specify method to use
          headers: { // headers to specify the type of data needed
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData)
        }) // fill body of request. Here the data is a JSON object })
          .then(function (response) {
            if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid else
            throw 'Failed!'
          })
          .catch(function (e) { // Process error for request
            alert(e) // Displays a browser alert with the error message. // This will be the string thrown in line 7 IF the
            // response code is the reason for jumping to this
            // catch() function.
          })
      })
      .catch(function (e) {
        console.log(e)
      })
  }
}

function displayStreak1 (num) {
  const win = document.getElementById('win')
  const heading = document.createElement('h3')
  const name = 'you have won ' + String(num) + ' games in your career'
  const text = document.createTextNode(name)
  heading.appendChild(text).className = ' display-1 position-relative text-white text-center'
  win.appendChild(heading)
}
function displayStreak2 (num) {
  const lose = document.getElementById('lose')
  const heading = document.createElement('h3')
  const name = 'you have won ' + String(num) + ' games in your career'
  const text = document.createTextNode(name)
  heading.appendChild(text).className = ' display-1 position-relative text-white text-center'
  lose.appendChild(heading)
}

document.querySelector('#closebutton').addEventListener('click', function () {
  document.querySelector('.popup').style.display = 'none';
  window.location.replace('/')
})
document.querySelector('#closebutton2').addEventListener('click', function () {
  document.querySelector('.popup2').style.display = 'none';
  window.location.replace('/')
})

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

let answer = ''
let allValid = []
let copyAnswer = ''

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
  fetch('/api/answer')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
    })
    .then(function (data) {
      answer = data[0]
      copyAnswer = answer
    })
    .catch(function (e) {
      console.log(e)
      // alert(e)
    })
  fetch('/api/isValid')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
    })
    .then(function (data) {
      allValid = allValid.concat(data)
    })
    .catch(function (e) {
      console.log(e)
      // alert(e)
    })
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
  fetch('/api/answer')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
    })
    .then(function (data) {
      answer = data[0]
      copyAnswer = answer
    })
    .catch(function (e) {
      console.log(e)
      // alert(e)
    })
  fetch('/api/isValid')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
    })
    .then(function (data) {
      allValid = allValid.concat(data)
    })
    .catch(function (e) {
      console.log(e)
      // alert(e)
    })
}, false)
