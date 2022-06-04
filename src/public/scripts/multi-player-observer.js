const container2 = document.getElementById("container2");  
  const container1 = document.getElementById("container1");  
  const container3 = document.getElementById("container3");  
  let num_of_players=3;
  function makeRows(row, col) {
    container1.style.setProperty('--grid-row', row);
    container1.style.setProperty('--grid-col', col);
    const numCells=row*col;
    for (i = 0; i < numCells; i++) {
      let cell = document.createElement("div");
      container1.appendChild(cell).className = 'opp1Grid-item';
    };
  };

  function makeRows2(row, col) {
    container2.style.setProperty('--grid-row', row);
    container2.style.setProperty('--grid-col', col);
    const numCells=row*col;
    for (i = 0; i < numCells; i++) {
      let cell = document.createElement("div");
      container2.appendChild(cell).className = 'opp2Grid-item';
    };
  };

  function makeRows3(row, col) {
    container3.style.setProperty('--grid-row', row);
    container3.style.setProperty('--grid-col', col);
    const numCells=row*col;
    for (i = 0; i < numCells; i++) {
      let cell = document.createElement("div");
      container3.appendChild(cell).className = 'opp3Grid-item';
    };
  };

const hOpponent1 = document.getElementById("hOpponent1");  
const hOpponent2 = document.getElementById("hOpponent2");  
const hsingle = document.getElementById("hsingle");  
hOpponent1.style.display = 'none'
hOpponent2.style.display = 'none'
hsingle.style.display = 'none'
if (num_of_players==3){
  makeRows2(6, 5);
  makeRows(6, 5);
  hOpponent1.style.display = 'initial'
  hOpponent2.style.display = 'initial'
  hsingle.style.display = 'none'
}
else if(num_of_players==2){
  makeRows3(6, 5);
  hOpponent1.style.display = 'none'
hOpponent2.style.display = 'none'
  hsingle.style.display = 'initial'
}