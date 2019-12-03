let tetris = document.querySelector('#tetris');
let tetrisData = [];
let currentBlock;
let nextBlock;
let currentTopLeft = [0, 3];
let score;
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
        color: 'blueviolet',
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
const blockColors = ['red', 'blueviolet', 'orange', 'skyblue', 'yellowgreen', 'pink', 'khaki'];

//블록의 이동가능여부를 판단하는 플래그.
const isActiveBlock = value => (value > 0 && value < 10);
//undefined는 바닥이라는 것을, 10보다 value가 높으면 바닥에 고정된 블록임을 뜻한다.
const isUnactiveBlock = value => (value === undefined || value >= 10);

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
    
    currentTopLeft = [-1, 3];
    
    //게임오버 조건을 판단한다.
    //나와야 할 블록에 이미 블록이 위치해있으면 더 이상 블록을 생성할 수 없기 때문에 패배
    let isGameOver = false;
    currentBlock.shape[0].slice(1).forEach((cell, i) => {
        cell.forEach((row, j) => {
            if (row && tetrisData[i][j + 3]) {
                isGameOver = true;
                break;
            }
        });
    });
    
    //블록 데이터를 생성한다.
    currentBlock.shape[0].slice(1).forEach((cell, i) => {
        console.log(currentBlock.shape[0], currentBlock.shape[0].slice(1), cell);
        cell.forEach((row, j) => { 
            if (row) {
                tetrisData[i][j + 3] = currentBlock.numberCode;
            }
        });
    });
    
    if (isGameOver) {
        clearInterval(interval);
        drawWindow();
        alert(`게임이 종료되었습니다. 최종 점수는 ${score}점 입니다.`);
    } else {
        drawWindow();
    }
}

//게임 화면을 표시
function drawWindow() {
    tetrisData.forEach((cell, i) => {
        cell.forEach((row, j) => {
            if (row > 0) {
                tetris.children[i].children[j].className = tetrisData[i][j] >= 10 
                    ? blockColors[tetrisData[i][j] / 10 - 1]
                    : blockColors[tetrisData[i][j] - 1];
            } else {
                tetris.children[i].children[j].className = '';
            }
        });
    });
}

//다음에 나올 블록을 화면에 표시
function drawNextBlock() {
    const nextTable = document.querySelector('#next-table');
    nextTable.querySelectorAll('tr').forEach((cell, i) => {
        Array.from(cell.children).forEach((row, j) => {
            if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
                nextTable.querySelectorAll('tr')[i].children[j].className = blockColors[nextBlock.numberCode - 1];
            } else {
                nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
            }
        });
    });
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
    //filter메소드를 이용해 화살표 함수 내의 조건에 맞는 배열을 새로 생성해낸다. 이는 곧 다 찬 줄은 지운다는 것을 의미한다.
    tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i));

    //지운 줄 수 만큼 다시 위에 빈 테이블을 얹어준다.
    for (let i = 0; i < fullRowsCount; i++) {
        tetrisData.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    score = parseInt(document.querySelector('#score').textContent, 10);
    score += fullRowsCount ** 2;
    document.querySelector('#score').textContent = String(score);
}

//한 칸씩 블록을 아래로 내린다.
function lowerBlock() {
    const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
    const activeBlocks = [];
    let canBlockDown = true;
    let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];

    //아래에 블럭이 있다면 작동하는 코드
    //블록의 범위(보통은 3x3)와 바로 아래 y좌표까지를 검사하게 된다.
    for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
        if (i < 0 || i >= 20) continue;

        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
            //현재 움직이고 있는 블록일 경우
            if (isActiveBlock(tetrisData[i][j])) {
                activeBlocks.push([i, j]);

                if (isUnactiveBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {
                    canBlockDown = false;
                }
            }
        }
    }

    //더이상 움직이지 못하는 상태일 경우
    if (!canBlockDown) {
        activeBlocks.forEach((blocks) => {
            tetrisData[blocks[0]][blocks[1]] *= 10;
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

//게임 화면 아래 세 종류의 버튼에 대한 이벤트
document.querySelector('#stop').addEventListener('click', function () {
    clearInterval(interval);
});
document.querySelector('#restart').addEventListener('click', function () {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(lowerBlock, 1000);
});
document.querySelector('#mute').addEventListener('click', function () {
    if (document.querySelector('#backgroundmusic').paused) {
        document.querySelector('#backgroundmusic').play();
    } else {
        document.querySelector('#backgroundmusic').pause();
    }
});

//키를 눌렀을 때 발생하는 이벤트
//블록이 고정되지 않는 문제 발생
//=> 확인 결과 한칸씩 내리는 함수에서 바닥인지 체크 후 10씩 곱하는 과정에서 배열 설정을 잘못해주었다는 것을 발견했다.
window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowLeft': {
            const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] - 1]; //정상적으로 왼쪽으로 이동할 경우의 좌표
            let isMovable = true;
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];

            //블록 왼쪽 공간을 확인한다.
            for (let i = currentTopLeft[0]; i < currentTopLeft[0] - currentBlockShape.length; i++) {
                if (!isMovable) break;

                for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                    if (!tetrisData[i] || !tetrisData[i][j]) continue;
                    if (isActiveBlock(tetrisData[i][j]) && isUnactiveBlock(tetrisData[i] && tetrisData[i][j - 1])) {
                        isMovable = false;
                    }
                }
            }

            //움직일 수 있는 공간이 있다고 판별될경우 왼쪽으로 한 칸 이동시킨다.
            if (isMovable) {
                currentTopLeft = nextTopLeft;
                tetrisData.forEach((cell, i) => {
                    for (let j = 0; j < cell.length; j++) {
                        const row = cell[j];
                        if (tetrisData[i][j - 1] === 0 && row < 10) {
                            tetrisData[i][j - 1] = row;
                            tetrisData[i][j] = 0;
                        }
                    }
                });

                drawWindow();
            }

            break;
        }
        case 'ArrowRight': {
            const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] + 1];
            let isMovable = true;
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];

            for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
                if (!isMovable) break;

                for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                    if (!tetrisData[i] || !tetrisData[i][j]) continue;
                    if (isActiveBlock(tetrisData[i][j]) && isUnactiveBlock(tetrisData[i] && tetrisData[i][j - 1])) {
                        isMovable = false;
                    }
                }
            }

            if (isMovable) {
                currentTopLeft = nextTopLeft;
                tetrisData.forEach((cell, i) => {
                    for (let j = cell.length - 1; j >= 0; j--) {
                        const row = cell[j];
                        if (tetrisData[i][j + 1] === 0 && row < 10) {
                            tetrisData[i][j + 1] = row;
                            tetrisData[i][j] = 0;
                        }
                    }
                });

                drawWindow();
            }

            break;
        }
        case 'ArrowDown':
            lowerBlock();
    }
});

//키를 눌렀다 떼면 일어나는 이벤트.
//keyup으로 설정할 경우 한 번만 이벤트가 실행되도록 유도할 수 있다.
//블록 회전시 좌우 끝에서 회전을 시킬 경우 오류 발생
window.addEventListener('keyup', (event) => {
    switch (event.code) {
        //한 번에 바닥까지 내리기
        case 'Space': {
            //lowerBlock()함수의 반환값이 false라는 것은 바닥까지 내려갔음을 뜻한다.
            while (lowerBlock()) {}
            //인터벌을 초기화해 다음 블록이 내려갈 시간에 영향을 미치지 않도록 하였다.
            clearInterval(interval);
            interval = setInterval(lowerBlock, 1000);

            break;
        }
        //블록 회전
        case 'ArrowUp': {
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
            let isChangeable = true;
            const nextShapeIndex = currentBlock.currentShapeIndex + 1 === currentBlock.shape.length
                ? 0
                : currentBlock.currentShapeIndex + 1;
            const nextBlockShape = currentBlock.shape[nextShapeIndex];

            //블록 방향을 회전한 후 공간을 확인한다.
            for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
                if (!isChangeable) break;
                for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                    if (!tetrisData[i]) continue;
                    if (nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]] > 0 && isUnactiveBlock(tetrisData[i] && tetrisData[i][j])) {
                        isChangeable = false;
                    }
                }
            }

            if (isChangeable) {
                while (currentTopLeft[0] < 0) {
                    lowerBlock();
                }

                //블록 방향을 회전한 후 공간을 확인한다.
                for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
                    for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                        if (!tetrisData[i]) continue;
                        
                        let nextBlockShapeCell = nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]];
                        if (nextBlockShapeCell > 0 && tetrisData[i][j] === 0) {//다음 모양은 존재하나 현재 칸이 없다면
                            tetrisData[i][j] = currentBlock.numberCode;
                        } else if (nextBlockShapeCell === 0 && tetrisData[i][j] && tetrisData[i][j] < 10) { //다음 모양은 없는데 현재 칸이 존재한다면
                            tetrisData[i][j] = 0;
                        }
                    }
                }

                currentBlock.currentShapeIndex = nextShapeIndex;
            }
            drawWindow();
            break;
        }
    }
});

let interval = setInterval(lowerBlock, 1000);

init();
createBlock();