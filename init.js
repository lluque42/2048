function resetScore(){
    let score = document.getElementById('score');
    score.textContent = 0;
}

function setupGridContainer() {
    const gridContainer = document.getElementById('gameBoard');
    gridContainer.style.gridTemplateColumns = `repeat(${conf.cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${conf.rows}, 1fr)`;
}

function initBoardGame(){
    // This will not work as expected, since console gets the reference to the object
    // and will NOT print the object at the time of the console.log,
    // but the object at its last (?) state
    //      console.log (gridMatrix);

    // This will work as expected, since JSON.stringify creates a new object
    // and console gets a dereferenced object
    //      console.log(JSON.parse(JSON.stringify(gridMatrix))); // Deep copy of gridMatrix
    
    // May be this should be undefined instead of null
    // and avoid the initialization of gridMatrix outside
    //if (gridMatrix === undefined){
    
    //gridMatrix = [ [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0] ];
    //gridMatrix = [ [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1] ];

    gridMatrix = [];
    for (let i = 0; i < conf.rows; i++) {
        gridMatrix[i] = [];
        for (let j = 0; j < conf.cols; j++) {
            gridMatrix[i][j] = 0;
        }
    }

    mergeableMatrix = [];
    for (let i = 0; i < conf.rows; i++) {
        mergeableMatrix[i] = [];
        for (let j = 0; j < conf.cols; j++) {
            mergeableMatrix[i][j] = 1;
        }
    }

    const gameBoard = document.getElementById('gameBoard');

    console.log("original grid Matrix: " + JSON.parse(JSON.stringify(gridMatrix)));
    spawnTilesIn(conf.start_tiles_number);

    console.log("initialized grid Matrix: " + JSON.parse(JSON.stringify(gridMatrix))); // Deep copy of gridMatrix
    //gameBoard.innerHTML = JSON.parse(JSON.stringify(gridMatrix));
    renderGameBoard();
    /*
    gameBoard.innerHTML = '';
    for (let row = 0; row < conf.rows; row++) {
        for (let col = 0; col < conf.cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = gridMatrix[row][col] !== -1 ? gridMatrix[row][col] : '';
            gameBoard.appendChild(cell);
        }
    }
    */
    //return gridMatrix;
}