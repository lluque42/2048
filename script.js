const conf = {
    rows:4,
    cols:4,
    max_start_val:4,
    start_tiles_number:2,
    next_tiles_number:1,
    allow_chain_reaction:0,
}

const cell = {
    empty:true,
    row:0,
    col:0,
}

// This matrix is an object, according to the console.log
// so it should be passed by reference
//let gridMatrix = [ [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1] ];
let gridMatrix = [[]];

let mergeableMatrix = [[]];

let gameOver = false;

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
        restartGame();
    });
    document.addEventListener('keydown', function(event) {
        handleKeyPress(event);
    });
    // Initialize the game on page load
    restartGame();
});


function gameBoardFull(){
    for (let i = 0; i < conf.rows; i++) {
        for (let j = 0; j < conf.cols; j++) {
            if (gridMatrix[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
};




function addToScore(value){
    let score = document.getElementById('score');
    score.textContent = parseInt(score.textContent) + value;
}

function resetScore(){
    let score = document.getElementById('score');
    score.textContent = 0;
}



// TODO:
// * Change the color of the tile according to its value

// DONE:
// * I think I saw a bug regarding the merging of same value consecutive tiles
//   In that case the merging tiles SHOULD BE the farther in the movement direction
//   check if every for loop in merge iterates in the right direction.
// * Also, I think I saw a merge chain reaction bug. Some flag should be set to
//  avoid multiple merges in the same move. (maybe a parallel matrix to store the flags?)
// * Update score
// * Game over should:
//     * Ignore any key press
//     * Gray out the board
// * ERROR: move or no move merge may happen



function setupGridContainer() {
    const gridContainer = document.getElementById('gameBoard');
    gridContainer.style.gridTemplateColumns = `repeat(${conf.cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${conf.rows}, 1fr)`;
}




function checkMerge(direction){
    mergesHappened = false;
    for (let i = 0; i < conf.rows; i++) {
        for (let j = conf.cols - 1; j >= 0; j--) {
            if (gridMatrix[i][j] !== 0) {
                if (direction === "right"){ // OK More than one same value tiles merges
                                            //as expected in this direction
                    if ((j + 1) < conf.cols && gridMatrix[i][j] === gridMatrix[i][j + 1]) {
                        gridMatrix[i][j + 1] *= 2;
                        gridMatrix[i][j] = 0;
                        mergeableMatrix[i][j + 1] = 0;
                        mergesHappened = true;
                        addToScore(gridMatrix[i][j + 1]);
                    }
                }
                else if (direction === "up"){   // OK More than one same value tiles merges
                                                //as expected in this direction
                    if ((i - 1) >= 0 && gridMatrix[i][j] === gridMatrix[i - 1][j]) {
                        gridMatrix[i - 1][j] *= 2;
                        gridMatrix[i][j] = 0;
                        mergeableMatrix[i - 1][j] = 0;
                        mergesHappened = true;
                        addToScore(gridMatrix[i - 1][j]);
                    }
                }

            }
        }
    }
    // Inverted iteration direction to comply with the desired behavior
    // when more than one same value tiles in the movement direction merges:
    //      The farther tiles in the movement direction are the ones that should merge
    for (let i = conf.rows - 1; i >= 0; i--) {
        for (let j = 0; j < conf.cols; j++) {
            if (gridMatrix[i][j] !== 0) {
                if (direction === "left"){  // OK More than one same value tiles merges
                                            //as expected in this direction
                    if ((j - 1) >= 0 && gridMatrix[i][j] === gridMatrix[i][j - 1]) {
                        gridMatrix[i][j - 1] *= 2;
                        gridMatrix[i][j] = 0;
                        mergeableMatrix[i][j - 1] = 0;
                        mergesHappened = true;
                        addToScore(gridMatrix[i][j - 1]);
                    }
                }
                else if (direction === "down"){ // OK More than one same value tiles merges
                                                //as expected in this direction
                    if ((i + 1) < conf.rows && gridMatrix[i][j] === gridMatrix[i + 1][j]) {
                        gridMatrix[i + 1][j] *= 2; 
                        gridMatrix[i][j] = 0;
                        mergeableMatrix[i + 1][j] = 0;
                        mergesHappened = true;
                        addToScore(gridMatrix[i + 1][j]);
                    }
                }





            }
        }
    }
    return mergesHappened;
}

function restartGame() {
    // Initialize the game board
    gameOver = false;
    resetScore();
    initBoardGame();
    //return gridMatrix;
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

function renderGameBoard(){
    setupGridContainer();
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    for (let row = 0; row < conf.rows; row++) {
        for (let col = 0; col < conf.cols; col++) {
            const cell = document.createElement('div');
            cell.id = `cell-${row}-${col}`;
//            cell.setAttribute('mergeable', true);
            cell.classList.add('cell');
            if (gridMatrix[row][col] !== 0)
            {
                cell.classList.remove('empty-cell');
                cell.classList.add('tile');
            }
            else
            {
                cell.classList.remove('tile');
                cell.classList.add('empty-cell');
            }
            cell.textContent = gridMatrix[row][col];
            gameBoard.appendChild(cell);
        }
    }
};