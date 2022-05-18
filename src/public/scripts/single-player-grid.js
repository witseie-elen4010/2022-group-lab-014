const container = document.getElementById("container");
function makeRows(row, col) {
  container.style.setProperty('--grid-row', row);
  container.style.setProperty('--grid-col', col);
  const numCells=row*col;
  for (i = 0; i < numCells; i++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "gameGrid-item";
  };
};
makeRows(6, 5);