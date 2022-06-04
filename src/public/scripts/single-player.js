
function makeRows (row, col) {
  container.style.setProperty('--grid-row', row)
  container.style.setProperty('--grid-col', col)
  const numCells = row * col
  for (let i = 0; i < numCells; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('id', 'cell' + i)
    cell.style = 'margin-top:5px'
    container.appendChild(cell).className = 'gameGrid-item'
  }
}

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
    key.name = element
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
                
                var current = new Date()
                const newData1={
                  "guess_made": inWord,
                  "valid": "valid",
                  "date_time": current.toLocaleString()
                }
                
                
                fetch ('/api/log2', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newData1)
                })
                .then(function(response){
                  if(response.ok)
                  return response.json();
                  throw 'Failed!'
                })
                .catch(function(e) {
                  alert(e)
                })

                inWord = ''
                currentRow += 1
              } else {

                var current = new Date()
                const newData2={
                  "guess_made": inWord,
                  "valid": "invalid",
                  "date_time": current.toLocaleString()
                }

                fetch ('/api/log2', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newData2)
                })
                .then(function(response){
                  if(response.ok)
                  return response.json();
                  throw 'Failed!'
                })
                .catch(function(e) {
                  alert(e)
                })

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
var chances=0;

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
function checkRight (word, row){
  copyAnswer=answer
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
  chances=chances+1;
  let won=0
  let name=""
  let played = 0
  if(word===answer){
    document.querySelector(".popup").style.display = "block";
    fetch('/api/user')
      .then(function (response) {
        if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
      })
      .then(function (data) {
        
        won=data.games_won+1
        name=data.username
        played=data.games_played+1

        const newData={
          "username": name,
          "games_played": played,
          "games_won": won
        }
        
        displayStreak1(won)
        
        fetch('/api/gamesWon', {
          method: 'post',//specify method to use
          headers: {//headers to specify the type of data needed
                  'Content-Type': 'application/json'
              },
          body: JSON.stringify(newData)
        }) // fill body of request. Here the data is a JSON object })
        .then(function(response) {
          if(response.ok)
          return response.json(); // Return the response parse as JSON if code is valid else
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
  else if (chances === 6){
    document.querySelector(".popup2").style.display = "block";
    fetch('/api/user')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
    })
    .then(function (data) {
      
      won=data.games_won
      name=data.username
      played=data.games_played+1

      const newData={
        "username": name,
        "games_played": played,
        "games_won": won
      }
      console.log(newData)
      displayStreak2(won)
      fetch('/api/gamesWon', {
        method: 'post',//specify method to use
        headers: {//headers to specify the type of data needed
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(newData)
      }) // fill body of request. Here the data is a JSON object })
      .then(function(response) {
        if(response.ok)
        return response.json(); // Return the response parse as JSON if code is valid else
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
  const win=document.getElementById("win")
  const heading = document.createElement('h3')
  const name = 'you have won ' + String(num) + ' games in your career'
  const text = document.createTextNode(name)
  heading.appendChild(text).className = ' display-1 position-relative text-white text-center'
  win.appendChild(heading)
  
}
function displayStreak2 (num) {
  const lose=document.getElementById("lose")
  const heading = document.createElement('h3')
  const name = 'you have won ' + String(num) + ' games in your career'
  const text = document.createTextNode(name)
  heading.appendChild(text).className = ' display-1 position-relative text-white text-center'
  lose.appendChild(heading)
}

function displayLogsWin(x){
  x.forEach(element => {
    const loggedpopup=document.getElementById("log")
    const par = document.createElement('p')
    const data1 = element.guess_made
    const data2 = element.username
    const data3 = element.action_type
    const data4 = element.time_of_action
    const text = document.createTextNode(data2 + ' ' + data1 + ' ' + data3 + ' ' + data4 + ' ')
    par.appendChild(text).className = 'display-1 position-relative text-white text-center'
    loggedpopup.appendChild(par)
  });
}

function displayLogsLose(x){
  x.forEach(element => {
    const loggedpopup=document.getElementById("log1")
    const par = document.createElement('p')
    const data1 = element.guess_made
    const data2 = element.username
    const data3 = element.action_type
    const data4 = element.time_of_action
    const text = document.createTextNode(data2 + ' ' + data1 + ' ' + data3 + ' ' + data4 + ' ')
    par.appendChild(text).className = 'display-1 position-relative text-white text-center'
    loggedpopup.appendChild(par)
  });
}

document.querySelector("#closebutton").addEventListener("click", function(){
  document.querySelector(".popup").style.display = "none";
    window.location.replace('/')
});
document.querySelector("#closebutton2").addEventListener("click", function(){
  document.querySelector(".popup2").style.display = "none";
  window.location.replace('/')
});
document.querySelector("#actionlog").addEventListener("click", function(){
  document.querySelector(".popup3").style.display = "initial";
  let logged = []
  fetch ('/api/log3')
    .then (function (response) {
      if(response.ok)
      return response.json(); // Return the response parse as JSON if code is valid else
      throw 'Failed!'
    })
    .then (function(data) {
      logged = data
      console.log(logged)
      displayLogsWin(logged)
    })
    .catch(function(e) {
      alert(e)
    })
});
document.querySelector("#closebutton3").addEventListener("click", function(){
  document.querySelector(".popup3").style.display = "none";
});
document.querySelector("#actionlog1").addEventListener("click", function(){
  document.querySelector(".popup4").style.display = "initial";
  let logged1 = []
  fetch ('/api/log3')
    .then (function (response) {
      if(response.ok)
      return response.json(); // Return the response parse as JSON if code is valid else
      throw 'Failed!'
    })
    .then (function(data) {
      logged1 = data
      console.log(logged1)
      displayLogsLose(logged1)
    })
    .catch(function(e) {
      alert(e)
    })
});
document.querySelector("#closebutton4").addEventListener("click", function(){
  document.querySelector(".popup4").style.display = "none";
});

const firstRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondRowKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdRowKeys = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
const RowOfKeys = [firstRowKeys, secondRowKeys, thirdRowKeys]

const container = document.getElementById('container')
const button = document.getElementById('play_game')

let answer = ''
let allValid = []

button.addEventListener('click', function () {
  button.style.display = 'none'
  const cellCount = 0
  makeRows(6, 5)
  makeKeyboard(firstRowKeys)
  makeKeyboard(secondRowKeys)
  makeKeyboard(thirdRowKeys)
  KeysInGrid(RowOfKeys, cellCount)
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
