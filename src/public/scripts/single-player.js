function makeRows(row, col) {
  container.style.setProperty('--grid-row', row);
  container.style.setProperty('--grid-col', col);
  const numCells=row*col;
  for (i = 0; i < numCells; i++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "gameGrid-item";
  };
};

const button = document.getElementById('startSingleGame')

button.addEventListener('click', function () {
button.style.display = 'none';
const container = document.getElementById("container");
 makeRows(6, 5);
}, false)

