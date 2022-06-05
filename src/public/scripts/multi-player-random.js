const container2 = document.getElementById('container2')
const container = document.getElementById('container')
const num_of_players = 2

function makeRows (row, col) {
  container.style.setProperty('--grid-row', row)
  container.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('id', 'cell' + i)

    container.appendChild(cell).className = 'gameGrid-item'
  };
};

function makeRows2 (row, col) {
  container2.style.setProperty('--grid-row', row)
  container2.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('id', 'oppCell' + i)
    container2.appendChild(cell).className = 'opp2Grid-item'
  };
};

function makeKeyboard (KeyRow) {
  const keyboard = document.getElementById('keyboard')
  const newDiv = document.createElement('div')
  newDiv.className = 'row align-items-center'
  if (KeyRow[0] === 'Q') {
    newDiv.style = 'margin-top:100px'
  }
  for (const element of KeyRow) {
    const key = document.createElement('button')
    key.setAttribute('id', element)
    key.type = 'button'
    key.className = 'col-sm btn btn-light btn btn-outline-dark'
    key.innerHTML = element
    newDiv.appendChild(key)
    keyboard.appendChild(newDiv)
  }
};

let inWord = ''

function KeysInGrid (KeyRow, cellCount) {
  let count = 0
  let currentRow = 0
  while (count !== 3) {
    for (const element of KeyRow[count]) {
      const inKey = document.getElementById(element)
      inKey.addEventListener('click', function () {
        changeColour()
        oppWon()
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

                sendGuess('valid')
                inWord = ''
                currentRow += 1
                sendColours()
              } else {
                sendGuess('not valid')
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

function checkRight (word, row) {
  copyAnswer = answer
  word = word.toLowerCase()
  for (let i = 0; i < 5; i++) {
    if (word[i] == copyAnswer[i]) {
      const cell = document.getElementById('cell' + (i + 5 * row))
      cell.className = 'gameGrid-item bg-success'
      const key = document.getElementById(word[i].toUpperCase())
      key.className = 'col-sm btn btn-success btn btn-outline-dark'
      copyAnswer = copyAnswer.replace(copyAnswer[i], '0')
      console.log(copyAnswer)
    }
  }
  for (let i = 0; i < 5; i++) {
    const cell = document.getElementById('cell' + (i + 5 * row))
    if (cell.className !== 'gameGrid-item bg-success') {
      if (copyAnswer.indexOf(word[i]) !== -1) {
        cell.className = 'gameGrid-item bg-warning'
        const key = document.getElementById(word[i].toUpperCase())
        if (key.className !== 'col-sm btn btn-success btn btn-outline-dark') {
          key.className = 'col-sm btn btn-warning btn btn-outline-dark'
        }
        copyAnswer = copyAnswer.replace(copyAnswer[copyAnswer.indexOf(word[i])], '0')
      } else if (copyAnswer.indexOf(word[i]) === -1) {
        cell.className = 'gameGrid-item bg-secondary'
        const key = document.getElementById(word[i].toUpperCase())
        if (key.className !== 'col-sm btn btn-success btn btn-outline-dark') {
          key.className = 'col-sm btn btn-secondary btn btn-outline-dark'
        }
        copyAnswer = copyAnswer.replace(copyAnswer[copyAnswer.indexOf(word[i])], '0')
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
    const edDiv = document.getElementById('gameover')
    const text = document.createElement('h4')
    const msg = document.createTextNode('You the winner')
    text.appendChild(msg).className = 'display-1 position-relative text-white text-center'
    edDiv.appendChild(text)
    iwin()
    getLogs()
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

document.querySelector('#closebutton').addEventListener('click', function () {
  document.querySelector('.popup').style.display = 'none'
  clearAll()
  window.location.replace('/')
})
document.querySelector('#closebutton2').addEventListener('click', function () {
  document.querySelector('.popup2').style.display = 'none'
  clearAll()
  window.location.replace('/')
})

const firstRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondRowKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdRowKeys = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
const RowOfKeys = [firstRowKeys, secondRowKeys, thirdRowKeys]

let answer = ''
let allValid = []

if (num_of_players == 2) {
  const cellCount = 0
  makeRows(6, 5)
  makeKeyboard(firstRowKeys)
  makeKeyboard(secondRowKeys)
  makeKeyboard(thirdRowKeys)
  KeysInGrid(RowOfKeys, cellCount)
  makeRows2(6, 5)
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
}

const oppColour = []

let index = -1

fetch('/api/multiUsers')
  .then(function (response) {
    if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
  })
  .then(function (data) {
    index = data.indexOf(window.localStorage.getItem('username'))
  })
  .catch(function (e) {
    console.log(e)
  })

function sendColours () {
  const colourArr = []
  for (let i = 0; i < 30; i++) {
    const cell = document.getElementById('cell' + i)
    const name = cell.className
    const newName = name.replace('gameGrid-item', 'opp2Grid-item')
    colourArr.push(newName)
  }
  const jsonCol = {
    colours: colourArr
  }
  if (index === 0) {
    fetch('/api/fetchColour1', {
      method: 'post', // specify method to use
      headers: { // headers to specify the type of data needed
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonCol)
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
  } else if (index === 1) {
    fetch('/api/fetchColour2', {
      method: 'post', // specify method to use
      headers: { // headers to specify the type of data needed
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonCol)
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
  }
}

function changeColour () {
  if (index === 0) {
    fetch('/api/sendColour2')
      .then(function (response) {
        if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
      })
      .then(function (data) {
        for (let i = 0; i < 30; i++) {
          const cell = document.getElementById('oppCell' + i)
          cell.className = data[i]
          console.log(data)
        }
      })
      .catch(function (e) {
        console.log(e)
      })
  } else if (index === 1) {
    fetch('/api/sendColour1')
      .then(function (response) {
        if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
      })
      .then(function (data) {
        for (let i = 0; i < 30; i++) {
          const cell = document.getElementById('oppCell' + i)
          cell.className = data[i]
        }
      })
      .catch(function (e) {
        console.log(e)
      })
  }
}

function sendGuess (isvalid) {
  const currTime = new Date()

  const guess = {
    username: window.localStorage.getItem('username'),
    guess: inWord,
    validGuess: isvalid,
    time: currTime.toLocaleString()
  }

  console.log(guess)

  fetch('/api/postLogs', {
    method: 'post', // specify method to use
    headers: { // headers to specify the type of data needed
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(guess)
  }) // fill body of request. Here the data is a JSON object })
    .then(function (response) {
      if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid else
      throw 'Failed!'
    })
    .catch(function (e) {
      alert(e)
    })
}

function getLogs () {
  fetch('/api/getLogs')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
    })
    .then(function (data) {
      data.forEach(element => {
        console.log(element)
        const loggedpopup = document.getElementById('gameover')
        const par = document.createElement('p')
        const data1 = element.username
        const data2 = element.guess
        const data3 = element.validGuess
        const data4 = element.time
        const text = document.createTextNode(data1 + ' ' + data2 + ' ' + data3 + ' ' + data4)
        par.appendChild(text).className = 'display-1 position-relative text-white text-center'
        loggedpopup.appendChild(par)
      })
    })
    .catch(function (e) {
      alert(e)
    })
}

function iwin () {
  const winner = {
    wins: 'true'
  }
  if (index === 0) {
    fetch('/api/postWin1', {
      method: 'post', // specify method to use
      headers: { // headers to specify the type of data needed
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(winner)
    }) // fill body of request. Here the data is a JSON object })
      .then(function (response) {
        if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid else
        throw 'Failed!'
      })
      .catch(function (e) {
        alert(e)
      })
  } else if (index === 1) {
    fetch('/api/postWin2', {
      method: 'post', // specify method to use
      headers: { // headers to specify the type of data needed
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(winner)
    }) // fill body of request. Here the data is a JSON object })
      .then(function (response) {
        if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid else
        throw 'Failed!'
      })
      .catch(function (e) {
        alert(e)
      })
  }
}

function oppWon () {
  if (index === 0) {
    fetch('/api/getWin2')
      .then(function (response) {
        if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
      })
      .then(function (data) {
        if (data) {
          document.querySelector('.popup').style.display = 'block'
          const edDiv = document.getElementById('gameover')
          const text = document.createElement('h4')
          const msg = document.createTextNode('You the loser')
          text.appendChild(msg).className = 'display-1 position-relative text-white text-center'
          edDiv.appendChild(text)
          getLogs()
        }
      })
      .catch(function (e) {
        alert(e)
      })
  } else if (index === 1) {
    fetch('/api/getWin1')
      .then(function (response) {
        if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
      })
      .then(function (data) {
        console.log(data)
        if (data) {
          document.querySelector('.popup').style.display = 'block'
          const edDiv = document.getElementById('gameover')
          const text = document.createElement('h4')
          const msg = document.createTextNode('You the loser')
          text.appendChild(msg).className = 'display-1 position-relative text-white text-center'
          edDiv.appendChild(text)
          getLogs()
        }
      })
      .catch(function (e) {
        alert(e)
      })
  }
}

function clearAll () {
  const nothing = {}
  fetch('/api/clearAll', {
    method: 'post', // specify method to use
    headers: { // headers to specify the type of data needed
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nothing)
  }) // fill body of request. Here the data is a JSON object })
    .then(function (response) {
      if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid else
      throw 'Failed!'
    })
    .catch(function (e) {
      alert(e)
    })
}
