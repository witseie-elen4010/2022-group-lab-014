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
var chances=0;

function checkRight (word, row){
  copyAnswer=answer
  word = word.toLowerCase()
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
  for (let i = 0; i < 5; i++) {
    const cell = document.getElementById('cell' + (i + 5 * row))
    if (cell.className !== 'gameGrid-item bg-success'){
      if (copyAnswer.indexOf(word[i]) !== -1) {
        cell.className = 'gameGrid-item bg-warning'
        const key = document.getElementById(word[i].toUpperCase())
        if (key.className !== 'col-sm btn btn-success btn btn-outline-dark'){
          key.className = 'col-sm btn btn-warning btn btn-outline-dark'
        }
        copyAnswer=copyAnswer.replace(copyAnswer[copyAnswer.indexOf(word[i])],'0')
    }
      else if (copyAnswer.indexOf(word[i]) === -1){ 
      cell.className = 'gameGrid-item bg-secondary'
        const key = document.getElementById(word[i].toUpperCase())
        if (key.className !== 'col-sm btn btn-success btn btn-outline-dark'){
          key.className = 'col-sm btn btn-secondary btn btn-outline-dark'
        }
      copyAnswer=copyAnswer.replace(copyAnswer[copyAnswer.indexOf(word[i])],'0')
    }
  }
}
chances=chances+1;
if(word===answer){
  document.querySelector(".popup").style.display = "block";
  fetch('/api/user')
  .then(function (response) {
    if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
  })
  .then(function (data) {
    
    won=data.games_won
    
    displayStreak1()
  })
  .catch(function (e) {
    console.log(e)
    // alert(e)
  })
}
else if (chances===6){
  document.querySelector(".popup2").style.display = "block";
  fetch('/api/user')
  .then(function (response) {
    if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
  })
  .then(function (data) {
    
    won=data.games_won
    
    displayStreak2()
  })
  .catch(function (e) {
    console.log(e)
    // alert(e)
  })
}
}

function displayStreak1 () {
  const win=document.getElementById("win")
  const heading = document.createElement('h3')
  const name = 'you have won ' + String(won) + ' games in your career'
  const text = document.createTextNode(name)
  heading.appendChild(text).className = ' display-1 position-relative text-white text-center'
  win.appendChild(heading)
  
}
function displayStreak2 () {
  const lose=document.getElementById("lose")
  const heading = document.createElement('h3')
  const name = 'you have won ' + String(won) + ' games in your career'
  const text = document.createTextNode(name)
  heading.appendChild(text).className = ' display-1 position-relative text-white text-center'
  lose.appendChild(heading)
  
}


document.querySelector("#closebutton").addEventListener("click", function(){
  document.querySelector(".popup").style.display = "none";
});
document.querySelector("#closebutton2").addEventListener("click", function(){
  document.querySelector(".popup2").style.display = "none";
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
