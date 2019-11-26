const tetris = document.querySelector('#tetris');
let tetrisData = [];

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

    console.log(tetris, fragment);
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
