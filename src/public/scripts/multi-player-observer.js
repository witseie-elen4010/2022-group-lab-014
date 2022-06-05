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
    cell.setAttribute('id', 'opp1Cell' + i)
    container1.appendChild(cell).className = 'opp1Grid-item'
  };
};

function makeRows2 (row, col) {
  container2.style.setProperty('--grid-row', row)
  container2.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('id', 'opp2Cell' + i)
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
  hOpponent1.style.display = 'initial'
  hOpponent2.style.display = 'initial'
}

const refresh = document.getElementById('refresh')

refresh.addEventListener('click', function () {
  changeColour1()
  changeColour2()
  dispWinner1()
  dispWinner2()
}, false)

function changeColour1 () {
  fetch('/api/sendColour2')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
    })
    .then(function (data) {
      for (let i = 0; i < 30; i++) {
        const cell = document.getElementById('opp1Cell' + i)
        cell.className = data[i]
      }
    })
    .catch(function (e) {
      console.log(e)
    })
}
function changeColour2 () {
  fetch('/api/sendColour1')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
    })
    .then(function (data) {
      for (let i = 0; i < 30; i++) {
        const cell = document.getElementById('opp2Cell' + i)
        let newClass = data[i]
        newClass = newClass.replace('opp2Grid-item', 'opp1Grid-item')
        cell.className = newClass
      }
    })
    .catch(function (e) {
      console.log(e)
    })
}

function dispWinner1 () {
  fetch('/api/getWin1')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
    })
    .then(function (data) {
      if (data) {
        document.querySelector('.popup').style.display = 'block'
        const edDiv = document.getElementById('gameover')
        const text = document.createElement('h4')
        const msg = document.createTextNode(hOpponent1.innerHTML + ' is the winner')
        text.appendChild(msg).className = 'display-1 position-relative text-white text-center'
        edDiv.appendChild(text)
        getLogs()
      }
    })
    .catch(function (e) {
      console.log(e)
    })
}

function dispWinner2 () {
  fetch('/api/getWin2')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
    })
    .then(function (data) {
      if (data) {
        document.querySelector('.popup').style.display = 'block'
        const edDiv = document.getElementById('gameover')
        const text = document.createElement('h4')
        const msg = document.createTextNode(hOpponent2.innerHTML + ' is the winner')
        text.appendChild(msg).className = 'display-1 position-relative text-white text-center'
        edDiv.appendChild(text)
        getLogs()
      }
    })
    .catch(function (e) {
      console.log(e)
    })
}

document.querySelector('#closebutton').addEventListener('click', function () {
  document.querySelector('.popup').style.display = 'none'
  clearAll()
  window.location.replace('/')
})

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
