function handleKeyPress(event) {
    checkGameOver();
    if (gameOver) {
        return;
    }
    keyPressed = event.key;
    switch (event.key) {
        case 'ArrowUp':
            arrowUp();       
            break;
        case 'ArrowDown':
            arrowDown();
            break;
        case 'ArrowLeft':
            arrowLeft();
            break;
        case 'ArrowRight':
            arrowRight();
            break;
        default:
            break;
    }
}

function arrowUp(){
    if (moveUp()){
        renderGameBoard();
        if (doMerge("up")){
            moveUp();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    } else {
        if (doMerge("up")){
            moveUp();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    }
}

function arrowDown(){
    if (moveDown()){
        renderGameBoard();
        if (doMerge("down")){
            moveDown();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    } else {
        if (doMerge("down")){
            moveDown();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    }
}

function arrowLeft(){
    if (moveLeft()){
        renderGameBoard();
        if (doMerge("left")){
            moveLeft();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    } else {
        if (doMerge("left")){
            moveLeft();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    }
}

function arrowRight(){
    if (moveRight()){
        renderGameBoard();
        if (doMerge("right")){
            moveRight();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    } else {
        if (doMerge("right")){
            moveRight();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    }
}   