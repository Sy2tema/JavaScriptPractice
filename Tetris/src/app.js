const tetris = document.querySelector('#tetris');
//색, 움직일 수 있는지 여부, 블록의 모양에 대한 정보를 기록한다.
//이동 불가 블록의 경우 땅에 내려앉은 블록이기 때문이다.
const blockList = [
    ['red', true, [
        [1, 1],
        [1, 1]
    ]],
    ['blueviolet', true, [
        [0, 1, 0],
        [1, 1, 1]
    ]],
    ['orange', true, [
        [1, 1, 0],
        [0, 1, 1]
    ]],
    ['skyblue', true, [
        [0, 1, 1],
        [1, 1, 0]
    ]],
    ['yellowgreen', true, [
        [1, 1, 1],
        [0, 0, 1]
    ]],
    ['pink', true, [
        [1, 1, 1],
        [1, 0, 0]
    ]],
    ['crimson', true, [
        [1, 1, 1, 1]
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
    7: ['crimson', true, [
        [1, 1, 1, 1]
    ]],
    10: ['red', true, []],
    20: ['blueviolet', true, []],
    30: ['orange', true, []],
    40: ['skyblue', true, []],
    50: ['yellowgreen', true, []],
    60: ['pink', true, []],
    70: ['crimson', true, []],
}

let tetrisData = [];

function drawWindow() {
    tetrisData.forEach((tr, i) => {
        tr.forEach((td, j) => {
            tetris.children[i].children[j].className = blockDictionary[td][0];
        });
    })
}

//임의의 블록을 선택해 블록을 생성한다.
//set property오류 발생(j부분에 문제 발생)
function blockFactory() {
    let block = blockList[Math.floor(Math.random() * 7)][2];
    console.log(block);

    block.forEach((tr, i) => {
        tr.forEach((td, j) => {
            tetrisData[i][j] = td;
        });
    });

    drawWindow();
}

function setTable() {
    //DocumentFragment는 다른 노드들을 담는 임시 컨테이너의 역할을 하는 노드다.
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 20; i++) {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        
        for (let j = 0; j < 10; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
    }

    tetris.appendChild(fragment);
}

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