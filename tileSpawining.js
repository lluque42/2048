function getRandomCoordinates(){
    let row = Math.floor(Math.random() * conf.rows);
    let col = Math.floor(Math.random() * conf.cols);
    return {row, col};
}

function getRandomTileValue(){
    return Math.random() < 0.5 ? 2 : 4;
}

function spawnTilesIn(tilesNumber) {
    for (let i = 0; i < tilesNumber; i++) {
        console.log(`i = ${i}`);
        let { row, col } = getRandomCoordinates();
        //console.log(`row = ${row}`, `col = ${col}`, `value = ${value}`);
        console.log(`row = ${row}`, `col = ${col}`);
        console.log(JSON.parse(JSON.stringify(gridMatrix)));
        while (gridMatrix[row][col] !== 0) {
            ({ row, col } = getRandomCoordinates());
        }
        let value = getRandomTileValue();
        console.log(`row = ${row}`, `col = ${col}`, `value = ${value}`);
        gridMatrix[row][col] = value;
    }
    return true;
    //return {row, col, value};   // returning an object from thin air

    //return gridMatrix;
}