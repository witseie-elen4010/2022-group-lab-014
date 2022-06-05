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
      cell.setAttribute('id', 'opp1Cell' + i)
      container1.appendChild(cell).className = 'opp1Grid-item';
    };
  };

  function makeRows2(row, col) {
    container2.style.setProperty('--grid-row', row);
    container2.style.setProperty('--grid-col', col);
    const numCells=row*col;
    for (i = 0; i < numCells; i++) {
      let cell = document.createElement("div");
      cell.setAttribute('id', 'opp2Cell' + i)
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
      makeRows(6, 5);
        makeRows2(6, 5);
        hOpponent1.style.display = 'initial'
        hOpponent2.style.display = 'initial'
        hsingle.style.display = 'none'
      }
















const refresh=document.getElementById('refresh')

refresh.addEventListener('click', function () {

  changeColour1() 
  changeColour2() 


},false)

function changeColour1() {
  fetch('/api/sendColour2')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
    })
    .then(function (data) {
      for (let i = 0; i<30; i++) {
        const cell = document.getElementById('opp1Cell' + i)
        cell.className = data[i]
        
        
      }
    })
    .catch(function (e) {
      console.log(e)
    })
  }
function changeColour2() {
  fetch('/api/sendColour1')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to fetch' }
    })
    .then(function (data) {
      for (let i = 0; i<30; i++) {
        let cell = document.getElementById('opp2Cell' + i)
        let newClass = data[i]
        newClass = newClass.replace('opp2Grid-item', 'opp1Grid-item')
        cell.className = newClass
        
      }
    })
    .catch(function (e) {
      console.log(e)
    })
}
    