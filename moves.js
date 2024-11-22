function moveUp(){
    moveHappened = false;
    for (let i = 0; i < conf.rows; i++) {
        for (let j = 0; j < conf.cols; j++) {
            if (gridMatrix[i][j] !== 0) {
                let k = i;
                while (k > 0 && gridMatrix[k - 1][j] === 0) {
                    gridMatrix[k - 1][j] = gridMatrix[k][j];
                    gridMatrix[k][j] = 0;
                    k--;
                    moveHappened = true;
                }
            }
        }
    }
    return moveHappened;
}

function moveDown(){
    moveHappened = false;
    for (let i = conf.rows - 1; i >= 0; i--) {
        for (let j = 0; j < conf.cols; j++) {
            if (gridMatrix[i][j] !== 0) {
                let k = i;
                while (k < conf.rows - 1 && gridMatrix[k + 1][j] === 0) {
                    gridMatrix[k + 1][j] = gridMatrix[k][j];
                    gridMatrix[k][j] = 0;
                    k++;
                    moveHappened = true;
                }
            }
        }
    }
    return moveHappened;
}

function moveLeft(){
    moveHappened = false;
    for (let i = 0; i < conf.rows; i++) {
        for (let j = 0; j < conf.cols; j++) {
            if (gridMatrix[i][j] !== 0) {
                let k = j;
                while (k > 0 && gridMatrix[i][k - 1] === 0) {
                    gridMatrix[i][k - 1] = gridMatrix[i][k];
                    gridMatrix[i][k] = 0;
                    k--;
                    moveHappened = true;
                }
            }
        }
    }
    return moveHappened;
}

function moveRight(){
    moveHappened = false;
    for (let i = 0; i < conf.rows; i++) {
        for (let j = conf.cols - 1; j >= 0; j--) {
            if (gridMatrix[i][j] !== 0) {
                let k = j;
                while (k < conf.cols - 1 && gridMatrix[i][k + 1] === 0) {
                    gridMatrix[i][k + 1] = gridMatrix[i][k];
                    gridMatrix[i][k] = 0;
                    k++;
                    moveHappened = true;
                }
            }
        }
    }
    return moveHappened;
}