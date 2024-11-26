function getRandomCoordinates(){
    let row = Math.floor(Math.random() * conf.rows);
    let col = Math.floor(Math.random() * conf.cols);
    return {row, col};
}

function getRandomTileValue(){
    return Math.random() < 0.5 ? 2 : 4;
}

function spawnTilesIn(tilesNumber) {
    if (gameBoardFull()) {
        return false;
    }
    for (let i = 0; i < tilesNumber; i++) {
        let { row, col } = getRandomCoordinates();
        while (gridMatrix[row][col] !== 0) {
            ({ row, col } = getRandomCoordinates());
        }
        let value = getRandomTileValue();
        gridMatrix[row][col] = value;
    }
    return true;
    //return {row, col, value};   // returning an object from thin air

    //return gridMatrix;
}