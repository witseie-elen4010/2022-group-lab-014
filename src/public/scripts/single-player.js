function makeRows(row, col) {
  container.style.setProperty('--grid-row', row);
  container.style.setProperty('--grid-col', col);
  const numCells = row * col;
  for (i = 0; i < numCells; i++) {
    let cell = document.createElement("div");
    cell.setAttribute('id', 'cell' + i)
    container.appendChild(cell).className = "gameGrid-item";
  };
};

function makeKeyboard(KeyRow) {
 const keyboard = document.getElementById("keyboard");
 var newDiv = document.createElement("div");
 newDiv.className = "row align-items-center";
  for (var i = 0; i < KeyRow.length; i++) {
    var key = document.createElement('button');
    key.setAttribute('id', KeyRow[i])
    key.type = 'button';
    key.className = "col-sm";
    key.innerHTML = KeyRow[i];
    newDiv.appendChild(key);
    keyboard.appendChild(newDiv)
  }
};

function KeysInGrid(KeyRow, cellCount) {
  let count = 0
  let currentRow = 0
  while (count != 3) {
    for (var j = 0; j < KeyRow[count].length; j++) {
      const inKey = document.getElementById(KeyRow[count][j]);
      inKey.addEventListener('click', function () {
        if ((inKey.innerHTML !== "DELETE")) {
          if(Math.floor(cellCount/5) === currentRow && inKey.innerHTML !== "ENTER"){
            const cell = document.getElementById('cell' + (cellCount))
            cell.innerHTML = inKey.innerHTML
            cellCount = cellCount + 1;
          }
          else if(inKey.innerHTML === "ENTER" && cellCount % 5 === 0 ){
            if (Math.floor(cellCount/5) !== currentRow) {
              currentRow+=1
            }
          }
        }
        else if (inKey.innerHTML == "DELETE" && cellCount > 0) {
          cellCount = cellCount - 1;
          document.getElementById('cell' + cellCount).innerHTML = ""
        }
      }, false)
    }
    count = count + 1
  }
};

var firstRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
var secondRowKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
var thirdRowKeys = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];
let RowOfKeys = [firstRowKeys, secondRowKeys, thirdRowKeys];

const button = document.getElementById('startSingleGame')

button.addEventListener('click', function () {
  button.style.display = 'none';
  const container = document.getElementById("container");
  let cellCount = 0
  makeRows(6, 5);
  makeKeyboard(firstRowKeys)
  makeKeyboard(secondRowKeys)
  makeKeyboard(thirdRowKeys)
  KeysInGrid(RowOfKeys, cellCount)
}, false)

