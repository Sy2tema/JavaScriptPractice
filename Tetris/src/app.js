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
const blockColors = ['white', 'red', 'blueViolet', 'orange', 'skyblue', 'yellowgreen', 'pink', 'khaki'];

//블록의 이동가능여부를 판단하는 플래그.
const isActiveBlock = value => (value > 0 && value < 10);
const isUnactiveBlock = value => (value === undefined || value >= 10);

function drawWindow() {
    
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

init();