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

window.addEventListener('keyup', (e) => {
    console.log(e);
});

setTable();
