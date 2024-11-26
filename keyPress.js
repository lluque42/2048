function handleKeyPress(event) {
    if (gameOver) {
        return;
    }
    if (gameBoardFull() && !checkMerge("up") && !checkMerge("down") && !checkMerge("left") && !checkMerge("right")) {
        const gridContainer = document.getElementById('gameBoard');
        Array.from(gridContainer.children).forEach(child => {
            child.classList.add('game-over');
        });
        alert("Game Over");
        gameOver = true;
    return;
    }
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
        if (checkMerge("up")){
            moveUp();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    } else {
        if (checkMerge("up")){
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
        if (checkMerge("down")){
            moveDown();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    } else {
        if (checkMerge("down")){
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
        if (checkMerge("left")){
            moveLeft();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    } else {
        if (checkMerge("left")){
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
        if (checkMerge("right")){
            moveRight();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    } else {
        if (checkMerge("right")){
            moveRight();
            renderGameBoard();
        }
        spawnTilesIn(conf.next_tiles_number);
        renderGameBoard();
    }
}   