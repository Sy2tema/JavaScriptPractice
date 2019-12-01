const tetris = document.querySelector('#tetris');
let tetrisData = [];
const currentBlock;
const nextBlock;
const currentTopLeft = [0, 3];
const blocks = [
    {
        name: 's', //네모
        center: false,
        numberCode: 1,
        color: 'red',
        currentShapeIndex: 0,
        shape: [[
            [0, 0, 0],
            [0, 1, 1],
            [0, 1, 1]
        ]]
    }, {
        name: 't', //T모양
        center: true,
        numberCode: 2,
        color: 'blueViolet',
        currentShapeIndex: 0,
        shape: [[
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ], [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ], [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ], [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ]]
    }, {
        name: 'z', //z자
        center: true,
        numberCode: 3,
        color: 'orenge',
        currentShapeIndex: 0,
        shape: [[
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ], [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ], [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ], [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ]]
    },
    {
        name: 'rz', //반대z자
        center: true,
        numberCode: 4,
        color: 'skyblue',
        currentShapeIndex: 0,
        shape: [[
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ], [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ], [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ], [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ]]
    },
    {
        name: 'l', //L자
        center: true,
        numberCode: 5,
        color: 'yellowgreen',
        currentShapeIndex: 0,
        shape: [[
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ], [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ], [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ], [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ]]
    },
    {
        name: 'rl', //반대L자
        center: true,
        numberCode: 6,
        color: 'pink',
        currentShapeIndex: 0,
        shape: [[
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ], [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ], [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ], [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ]]
    },
    {
        name: 'b', //길쭉한 일자
        center: true,
        numberCode: 7,
        color: 'khaki',
        currentShapeIndex: 0,
        shape: 
        [[
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ], [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ], [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ], [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ]]
    },
];

//게임에 사용될 색들의 배열
const blockColors = ['red', 'blueViolet', 'orange', 'skyblue', 'yellowgreen', 'pink', 'khaki'];

//블록의 이동가능여부를 판단하는 플래그.
const isActiveBlock = value => (value > 0 && value < 10);
const isUnactiveBlock = value => (value === undefined || value >= 10);

//게임 화면을 표시
function drawWindow() {
    tetrisData.forEach((cell, i) => {
        cell.forEach((row, j) => {
            if (row > 0) {
                tetris.children[i].children[j].className 
                    = tetrisData[i][j] >= 10 
                    ? colors[tetrisData[i][j] / 10 - 1] 
                    : colors[tetrisData[i][j] - 1];
            } else {
                tetris.children[i].children[j].className = '';
            }
        });
    });
}

//다음에 나올 블록을 화면에 표시
function drawNextBlock() {
    const nextTable = document.querySelector('#nextTable');
    nextTable.querySelectorAll('tr').forEach((cell, i) => {
        Array.from(cell.children).forEach((row, j) => {
            if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
                nextBlock.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numberCode - 1];
            } else {
                nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
            }
        });
    });
}

//게임 화면 생성
function init() {
    const fragment = document.createDocumentFragment();
    [...Array(20).keys()].forEach((cell, i) => {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        [...Array(10).keys()].forEach((row, j) => {
            const td = document.createElement('td');
            tr.appendChild(td);
        });
        const column = Array(10).fill(0);
        tetrisData.push(column);
    });

    tetris.appendChild(fragment);
}


//블록 생성
function createBlock() {
    if (!currentBlock) {
        //블록들을 정의해놓은 배열들 중에서 랜덤으로 한 종류를 뽑는다.
        currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
    } else {
        currentBlock = nextBlock;
    }
    
    currentBlock.currentShapeIndex = 0;
    nextBlock = blocks[Math.floor(Math.random() * blocks.length)];
    drawNextBlock();

    //처음 블록이 등장할 장소를 가상의 칸을 설정해 한칸 위로 설정하는데 이를 통해
    //3X3 배열인 블록들이 최상단부터 시작할 수 있도록 만들어준다.
    if (currentBlock.numberCode === 7) {
        currentTopLeft = [-2, 3];
    } else {
        currentTopLeft = [-1, 3];
    }

    //게임오버 조건을 판단한다.
    let isGameOver = false;
    currentBlock.shape[0].slice(1).forEach((cell, i) => {
        cell.forEach((row, j) => {
            if (row && tetrisData[i][j + 3]) {
                isGameOver = true;
            }
        });
    });

    //블록 데이터를 생성한다.
    currentBlock.shape[9].slice(1).forEach((cell, i) => {
        cell.forEach((row, j) => { 
            if (row) {
                tetrisData[i][j + 3] = currentBlock.numberCode;
            }
        });
    });

    if (isGameOver) {
        clearInterval(interval);
        drawWindow();
        alert('게임이 종료되었습니다.');
    } else {
        drawWindow();
    }
}

//가로의 한 줄이 블록으로 다 찼는지 검사
function checkRows() {
    const fullRows = [];
    tetrisData.forEach((cell, i) => {
        let count = 0;
        cell.forEach((row, j) => {
            if (row > 0) {
                count++;
            }
        });

        if (count === 10) {
            fullRows.push(i);
        }
    });

    const fullRowsCount = fullRows.length;
    tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i));

    for (let i = 0; i < fullRowsCount; i++) {
        tetrisData.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    let score = parseInt(document.querySelector('#score').textContent, 10);
    score += fullRowsCount ** 2;
    document.querySelector('#score').textContent = String(score);
}

function lowerBlock() {
    const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
    const activeBlocks = [];
    let canBlockDown = true;
    let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];

    //아래에 블럭이 있다면 작동하는 코드
    for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
        if (i < 0 || i >= 20) continue;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] = currentBlockShape.length; j++) {
            if (isActiveBlock(tetrisData[i][j])) {
                activeBlocks.push([i, j]);

                if (isUnactiveBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {
                    canBlockDown = false;
                }
            }
        }
    }

    if (!canBlockDown) {
        activeBlocks.forEach((blocks) => {
            tetrisData[blocks[0][blocks[1]]] *= 10;
        });

        checkRows();
        createBlock();
        return false;
    } else if (canBlockDown) {
        //블록을 한 줄 밑으로 내린다.
        for (let i = tetrisData.length - 1; i >= 0; i--) {
            const cell = tetrisData[i];
            cell.forEach((row, j) => {
                if (row < 10 && tetrisData[i + 1] && tetrisData[i + 1][j] < 10) {
                    tetrisData[i + 1][j] = row;
                    tetrisData[i][j] = 0;
                }
            });
        }

        currentTopLeft = nextTopLeft;
        drawWindow();
        return true;
    }
}

document.querySelector('#stop').addEventListener('click', function () {
    clearInterval(interval);
});

document.querySelector('#restart').addEventListener('click', function () {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(lowerBlock, 2000);
});

document.querySelector('#backgroundmusic').addEventListener('click', function () {
    if (document.querySelector('#backgroundmusic').paused) {
        document.querySelector('#backgroundmusic').play();
    } else {
        document.querySelector('#backgroundmusic').pause();
    }
});

let interval = setInterval(lowerBlock, 2000);

init();
createBlock();