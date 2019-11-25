/*eslint no-undef: "off"*/
//기본 지뢰찾기의 경우 첫 번째 클릭은 무조건 지뢰가 아니기 때문에
//첫 번째 클릭은 0이 되도록 만들며 그 뒤 게임이 시작되는 것으로 하자
var tbody = document.querySelector("#table tbody");
var data = [];

var list = {
    open: -1,
    flag: -2,
    question: -3,
    mineOfQuestion: -4,
    mineOfFlag: -5,
    mine: 1,
    common: 0
};

var stopFlag = false;
var opened = 0;



document.querySelector("#init").addEventListener("click", function () {
    //tbody내부의 모든 태그들을 지우기 위한 코드
    tbody.innerHTML = "";
    document.querySelector("#result").textContent = "";
    data = [];
    stopFlag = false;
    opened = 0;
    
    var hor = document.querySelector("#horizontal").value;
    var ver = document.querySelector("#vertical").value;
    var mine = document.querySelector("#mines").value;

    //지뢰를 심을 위치를 할당하는 과정
    var matrix = Array(hor * ver)
        .fill()
        .map(function (elemant, index) {
            return index;
    }); //이 부분은 공간 할당시 계속 유용하게 쓰일 부분이다.
    
    mineShuffle = [];
    
    length = ver * hor - mine;
    
    while (matrix.length > length) {
        var choice = matrix.splice(Math.floor(Math.random() * matrix.length), 1)[0];
        mineShuffle.push(choice);
    }
    //지뢰찾기 테이블 생성
    for (var i = 0; i < ver; i++) {
        var arr = [];
        var tr = document.createElement("tr");
        data.push(arr);
        for (var j = 0; j < hor; j++) {
            arr.push(list.common);
            var td = document.createElement("td");
            //contextmenu를 이용해 오른쪽 클릭시 이벤트를 지정해줄 수 있다.
            //오른쪽 클릭시 깃발을 꽂을 수 있도록 하는 이벤트리스너
            //비동기일때도 정상적으로 작동할 수 있도록 만들어준다.
            td.addEventListener("contextmenu", function (e) {
                e.preventDefault(); //기존의 메뉴를 나타내는 효과를 막는다.
                if (stopFlag) {
                    return;
                }
                
                var parentTr = e.currentTarget.parentNode; //target을 사용해도 괜찮으며 현재 선택한 태그를 지목하는 기능을 한다.
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var x = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var y = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                
                //이미 열린 빈칸에 깃발을 찍을 수 없도록 한다.
                if (data[y][x] === list.open) {
                    return;
                }
                
                if (e.currentTarget.textContent === "" || e.currentTarget.textContent === "X") {
                    e.currentTarget.textContent = "!";
                    if (data[y][x] === list.mine) {
                        data[y][x] = list.mineOfFlag;
                    } else {
                        data[y][x] = list.flag;
                    }
                } else if (e.currentTarget.textContent === "!") {
                    e.currentTarget.textContent = "?";
                    if (data[y][x] === list.mineOfFlag) {
                        data[y][x] = list.mineOfQuestion;
                    } else {
                        data[y][x] = list.question;
                    }
                } else if (e.currentTarget.textContent === "?") {
                    if (data[y][x] === list.mineOfQuestion) {
                        e.currentTarget.textContent = "X";
                        data[y][x] = list.mine;
                    } else {
                        e.currentTarget.textContent = "";
                        data[y][x] = list.common;
                    }
                }
                console.log(data);
            });
            
            //클릭 시 주변 지뢰의 개수를 알려주는 함수
            td.addEventListener("click", function (e) {
                if (stopFlag) {
                    return;
                }
                
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var x = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var y = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                
                if ([list.open, list.flag, list.question, list.mineOfQuestion, list.mineOfFlag].includes(data[y][x])) {
                    return;
                }
                
                //클릭시
                e.currentTarget.classList.add("opened");
                opened++;
                
                if (data[y][x] === list.mine) { //지뢰를 클릭했을 때
                    e.currentTarget.textContent = "펑";
                    document.querySelector("#result").textContent = "패배하셨습니다...";
                } else if (opened === length) { //승리 조건이며 가장 마지막 클릭이 지뢰일 경우 승리하는 버그가 발견되어 else if로 편입시켰다.
                    stopFlag = true;
                    document.querySelector("#result").textContent = "승리하셨습니다!";
                } else { //지뢰가 아닐 경우
                    var cover =  [data[y][x - 1], data[y][x + 1]];
                    if (data[y - 1]) {
                        cover = cover.concat([data[y - 1][x - 1], data[y - 1][x], data[y - 1][x + 1]]);
                    }
                    if (data[y + 1]) {
                        cover = cover.concat([data[y + 1][x - 1], data[y + 1][x], data[y + 1][x + 1]]);
                    }
                    var surroundingMines = cover.filter(function (value) {
                        return [list.mine, list.mineOfFlag, list.mineOfQuestion].includes(value);
                    }).length;
                    
                    //주변에 지뢰가 없을 경우 빈 쉘로 만들어준다.
                    //false인 값 : false, "", 0, undefined, NaN, null
                    e.currentTarget.textContent = surroundingMines || "";
                    data[y][x] = list.open;
                    
                    if (surroundingMines === 0) {
                        var neighbor = [];
                        
                        if (tbody.children[y - 1]) {
                            neighbor = neighbor.concat([
                                tbody.children[y - 1].children[x - 1], 
                                tbody.children[y - 1].children[x], 
                                tbody.children[y - 1].children[x + 1]
                            ]);
                        }
                        
                        neighbor = neighbor.concat([
                            tbody.children[y].children[x - 1],
                            tbody.children[y].children[x + 1]
                        ]);
                        
                        if (tbody.children[y + 1]) {
                            neighbor = neighbor.concat([
                                tbody.children[y + 1].children[x - 1], 
                                tbody.children[y + 1].children[x], 
                                tbody.children[y + 1].children[x + 1]
                            ]);
                        }
                        
                        neighbor.filter(function (value) {
                            return !!value;
                        }).forEach(function (next) {
                            var parentTr = next.parentNode;
                            var parentTbody = next.parentNode.parentNode;
                            var nextX = Array.prototype.indexOf.call(parentTr.children,     next);
                            var nextY = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                            
                            if (data[nextY][nextX] !== list.open) {
                                next.click();
                            }
                        });
                    }
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    
    //할당했던 지뢰들을 테이블에 삽입
    for (var k = 0; k < mineShuffle.length; k++) {
        var y = Math.floor(mineShuffle[k] / ver);
        var x = mineShuffle[k] % ver;
        tbody.children[y].children[x].textContent = "";
        data[y][x] = list.mine;
    }
});


