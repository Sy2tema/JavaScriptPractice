const tetris = document.querySelector('#tetris');
//색, 움직일 수 있는지 여부, 블록의 모양에 대한 정보를 기록한다.
//이동 불가 블록의 경우 땅에 내려앉은 블록이기 때문이다.
//각 배열의 숫자값을 다르가 설정해주어야 정상적으로 블록에 색이 들어가게 된다.
let blockList = [
    ['red', true, [
        [1, 1],
        [1, 1]
    ]],
    ['blueviolet', true, [
        [0, 2, 0],
        [2, 2, 2]
    ]],
    ['orange', true, [
        [3, 3, 0],
        [0, 3, 3]
    ]],
    ['skyblue', true, [
        [0, 4, 4],
        [4, 4, 0]
    ]],
    ['yellowgreen', true, [
        [5, 5, 5],
        [0, 0, 5]
    ]],
    ['pink', true, [
        [6, 6, 6],
        [6, 0, 0]
    ]],
    ['khaki', true, [
        [7, 7, 7, 7]
    ]]
];

const blockDictionary = {
    0: ['white', false, []],
    1: ['red', true, [
        [1, 1],
        [1, 1]
    ]],
    2: ['blueviolet', true, [
        [0, 1, 0],
        [1, 1, 1]
    ]],
    3: ['orange', true, [
        [1, 1, 0],
        [0, 1, 1]
    ]],
    4: ['skyblue', true, [
        [0, 1, 1],
        [1, 1, 0]
    ]],
    5: ['yellowgreen', true, [
        [1, 1, 1],
        [0, 0, 1]
    ]],
    6: ['pink', true, [
        [1, 1, 1],
        [1, 0, 0]
    ]],
    7: ['khaki', true, [
        [1, 1, 1, 1]
    ]],
    10: ['red', true, []],
    20: ['blueviolet', true, []],
    30: ['orange', true, []],
    40: ['skyblue', true, []],
    50: ['yellowgreen', true, []],
    60: ['pink', true, []],
    70: ['khaki', true, []],
}

let tetrisData = [];
//플래그 변수를 활용해 블록이 바닥에 닿았을 때 바닥에 닿지 않은 블록들이 더 내려가지 않도록 방지한다.
let stopFalling = false;

//테트리스 게임 화면을 출력하는 역할을 하는 함수
const drawWindow = () => {
    tetrisData.forEach((tr, i) => {
        tr.forEach((td, j) => {
            tetris.children[i].children[j].className = blockDictionary[td][0];
        });
    })
};

//블록을 한 칸 내리도록 하는 함수
//위에서부터 읽어내려가면 누락되는 데이터가 생길 수 있기 때문에 배열 아래서부터 읽어 올라가도록 한다.
const lowerBlock = () => {
    for (let i = tetrisData.length - 1; i >= 0; i--) {
        tetrisData[i].forEach((td, j) => {
            //Dictionary에 정의되어있듯이 움직일 수 있는 블록임을 뜻함
            if (td > 0 && td < 10) {
                //내려갈 곳이 있을 경우와 플래그가 false일 경우
                if (tetrisData[i + 1] && !stopFalling) {
                    tetrisData[i + 1][j] = td;
                    tetrisData[i][j] = 0;
                } else if (tetrisData[i + 1][j] < 0 || tetrisData[i + 1][j] > 10) { 
                    stopFalling = true;
                    tetrisData[i][j] = td * 10;
                } else { //바닥에 도달할 경우 더 이상 내려가지 못하도록 조치한다.
                    stopFalling = true;
                    tetrisData[i][j] = td * 10;
                }
            }
        });
    }

    if (stopFalling) {
        stopFalling = false;
        blockFactory();
    }

    console.log(tetrisData);
    drawWindow();
};

//임의의 블록을 선택해 블록을 생성한다.
const blockFactory = () => {
    let block = blockList[Math.floor(Math.random() * 7)][2];
    console.log(block);

    block.forEach((tr, i) => {
        tr.forEach((td, j) => {
            //TODO: 블록 생성할 지점이 0이 아니라면 게임 오버 처리
            tetrisData[i][j + 3] = td;
        });
    });

    console.log(tetrisData);
    drawWindow();
};

const setTable = () => {
    //DocumentFragment는 다른 노드들을 담는 임시 컨테이너의 역할을 하는 노드다.
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 20; i++) {
        const tr = document.createElement('tr');
        let array = [];
        tetrisData.push(array);
        fragment.appendChild(tr);
        
        for (let j = 0; j < 10; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
            array.push(0);
        }
    }

    tetris.appendChild(fragment);
};

//keyup은 버튼을 눌렀다가 뗄 때 발생하는 이벤트이다.
//keydown은 버튼을 누를 때 발생하는 이벤트이며 keypress는 방향키를 인식하지 못한다.
window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'Space': //한 번에 밑으로 내리기
            break;
        case 'ArrowUp': //블럭 회전시키기
            break;
        default:
            break;
    }
});

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowRight':
            break;
        case 'ArrowLeft':
            break;
        case 'ArrowDown':
            break;
        default:
            break;
    }
});

setTable();
blockFactory();
setInterval(lowerBlock, 100);