const conf = {
    rows:4,
    cols:4,
    max_start_val:4,
    start_tiles_number:2,
    allow_chain_reaction:0,
}

const cell = {
    empty:true,
    row:0,
    col:0,
}

// This matrix is an object, according to the console.log
// so it should be passed by reference
let gridMatrix = [ [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1] ];
//let gridMatrix;
console.log("typeof gridMatrix: " + typeof gridMatrix);

// NOTICE THE USE OF ANONYMOUS FUNCTIONS here:
//
// This intuitive way is WRONG:
// document.addEventListener('DOMContentLoaded', initBoardGame(null));
// Because initBoardGame() is called immediately and not when the event is fired
// and is its return that is passed to the addEventListener function AND
// NOT an actual function to be called when the event is fired.
// The syntax for an anonymous function is:
//    function() { ... }
//
// This adds a listener for the event DOMContentLoaded which
// is fired when the initial HTML document has been completely loaded and parsed
// This is an assurance to do things once and after the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // This is an event listener for the click event on the element
    // with the id 'restart-btn'. This is preferred over the onclick attribute
    // in the HTML:
    // <button id="restart-btn" onclick="restartGame()">Restart</button>
    document.getElementById('restart-btn').addEventListener('click', function() {
        restartGame(gridMatrix);
    });

    // Initialize the game on page load
    restartGame(gridMatrix);
});

function restartGame(gridMatrix) {
    // Initialize the game board
    initBoardGame(gridMatrix);
    //return gridMatrix;
}

function initBoardGame(gridMatrix){
    // This will not work as expected, since console gets the reference to the object
    // and will NOT print the object at the time of the console.log,
    // but the object at its last (?) state
    //      console.log (gridMatrix);

    // This will work as expected, since JSON.stringify creates a new object
    // and console gets a dereferenced object
    //      console.log(JSON.parse(JSON.stringify(gridMatrix))); // Deep copy of gridMatrix
    
    // May be this should be undefined instead of null
    // and avoid the initialization of gridMatrix outside
    if (gridMatrix === undefined){
        gridMatrix = [ [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], ];
    }
    const gameBoard = document.getElementById('gameBoard');

    console.log("original grid Matrix: " + JSON.parse(JSON.stringify(gridMatrix)));
   spawnTilesIn(gridMatrix,2);

    console.log(JSON.parse(JSON.stringify(gridMatrix))); // Deep copy of gridMatrix
    gameBoard.innerHTML = '';
    for (let row = 0; row < conf.rows; row++) {
        for (let col = 0; col < conf.cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = gridMatrix[row][col] !== -1 ? gridMatrix[row][col] : '';
            gameBoard.appendChild(cell);
        }
    }
    //return gridMatrix;
}


function getRandomCoordinates(){
    let row = Math.floor(Math.random() * conf.rows);
    let col = Math.floor(Math.random() * conf.cols);
    return {row, col};
}

function getRandomTileValue(){
    return Math.random() < 0.5 ? 2 : 4;
}

function spawnTilesIn(gridMatrix, tilesNumber) {
    for (let i = 0; i < tilesNumber; i++) {
        console.log(`i = ${i}`);
        let { row, col } = getRandomCoordinates();
        //console.log(`row = ${row}`, `col = ${col}`, `value = ${value}`);
        console.log(`row = ${row}`, `col = ${col}`);
        console.log(JSON.parse(JSON.stringify(gridMatrix)));
        while (gridMatrix[row][col] !== -1) {
            ({ row, col } = getRandomCoordinates());
        }
        let value = getRandomTileValue();
        console.log(`row = ${row}`, `col = ${col}`, `value = ${value}`);
        gridMatrix[row][col] = value;
    }
    //return {row, col, value};   // returning an object from thin air

    //return gridMatrix;
}

/*
function initCells(){
    const gameBoard = document.getElementById('gameBoard');
    for (let i = 0; i < conf.rows; i++) {
        for (let j = 0; j < conf.cols; j++) {
            
            //cells[i][j] = {...cell}
            const currentCell = document.createElement('div');
            currentCell.textContent = `row ${i} col ${j}`;
            currentCell.classList.add('cell');
            //currentCell.innerHTML = `row ${i} col ${j}`;
            gameBoard.appendChild(currentCell);
        }
    }
}
*/

