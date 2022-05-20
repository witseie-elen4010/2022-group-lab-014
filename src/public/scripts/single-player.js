function makeRows(container,row, col) {
  container.style.setProperty('--grid-row', row);
  container.style.setProperty('--grid-col', col);
  const numCells=row*col;
  for (i = 0; i < numCells; i++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "gameGrid-item";
  };
};


function makeKeyboard(KeyRow){
  
  const keyboard = document.getElementById("keyboard");
  
  var newDiv = document.createElement("div"); 
  newDiv.className = "row align-items-center";
  for (var i = 0; i < KeyRow.length; i++) {
      
      
      var key = document.createElement('button'); 
      key.type = 'button';
      key.className ="col-sm";
      key.innerHTML = KeyRow[i];
      newDiv.appendChild(key);
      keyboard.appendChild(newDiv) 
    
}

};

var firstRowKeys = ["Q","W","E","R","T","Y","U","I","O","P"];
var secondRowKeys = ["A","S","D","F","G","H","J","K","L"];
var thirdRowKeys = ["ENTER","Z","X","C","V","B","N","M","DELETE"];

const button = document.getElementById('startSingleGame')

button.addEventListener('click', function () {
button.style.display = 'none';
const container = document.getElementById("container");
makeRows(container,6, 5);
makeKeyboard(firstRowKeys)
makeKeyboard(secondRowKeys)
makeKeyboard(thirdRowKeys)
 






 
}, false)

