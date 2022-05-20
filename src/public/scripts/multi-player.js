  function makeRows(row, col) {
    container.style.setProperty('--grid-row', row);
    container.style.setProperty('--grid-col', col);
    const numCells=row*col;
    for (i = 0; i < numCells; i++) {
      let cell = document.createElement("div");
      container.appendChild(cell).className = "gameGrid-item";
    };
  };
  
  const button1 = document.getElementById('mode1')
  const button2 = document.getElementById('mode2')
  const heading1 = document.getElementById('h1')
  const heading2 = document.getElementById('h3')
  
  button1.addEventListener('click', function () {
  button1.style.display = 'none';
  button2.style.display = 'none';
  heading1.style.display = 'none';
  heading2.style.display = 'none';
  const container = document.getElementById("container");
  makeRows(6, 5);
  }, false)

  button2.addEventListener('click', function () {
  button1.style.display = 'none';  
  button2.style.display = 'none';
  h1.style.display = 'none';
  h3.style.display = 'none';
  const container = document.getElementById("container");
  makeRows(6, 5);
  }, false)
  
  