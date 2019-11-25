/*eslint no-undef: "off"*/
var body = document.body;
var table = document.createElement("table");
var columns = [];
var rows = [];
var turn = "X";



//승부 결과 출력 및 초기화
function gameResult(draw) {
    if (draw) {
        resultWord.textContent = "비겼습니다.";
    } else {
        if (turn === "X") {
            resultWord.textContent = "플레이어가 승리했습니다.";
        } else if (turn === "O") {
            resultWord.textContent = "컴퓨터가 승리했습니다.";
        }
    }
    
    turn = "X";
    
    setTimeout(function () {
        rows.forEach(function (column) {
            column.forEach(function (row) {
                row.textContent = "";
            });
        });
        resultWord.textContent = "";
    }, 1500);
    
}

//승리 여부 확인
function checkWinOption(colNum, rowNum) {
    var win = false;
    
    //가로 검사
    if (rows[colNum][0].textContent === turn &&
        rows[colNum][1].textContent === turn &&
        rows[colNum][2].textContent === turn
       ) win = true;
     
    //세로 검사
    if (rows[0][rowNum].textContent === turn &&
        rows[1][rowNum].textContent === turn &&
        rows[2][rowNum].textContent === turn
       ) win = true;
    
    //왼쪽 대각선 검사
    if (rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn
       ) win = true;
    
    //오른쪽 대각선 검사
    if (rows[0][2].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][0].textContent === turn
       ) win = true;
    
    return win;
}

var clickEvent = function (e) {
    if (turn === "O") { //컴퓨터 순서일 때 플레이어가 둘 수 없도록 함
        return;
    }
    
    var colNum = columns.indexOf(e.target.parentNode);
    var rowNum = rows[colNum].indexOf(e.target);
    
    if (rows[colNum][rowNum].textContent == "") { //칸에 O나 X입력
        rows[colNum][rowNum].textContent = turn;
        
        var win = checkWinOption(colNum, rowNum);
        
        //현재 게임판에 놓을 자리가 남았는지 확인하는 코드
        //기존 변수를 스코프체인의 바깥으로 꺼내는 것은 문제가 발생하지 않는다.
        var entry = [];
        rows.forEach(function (column) {
           column.forEach(function (row) {
               entry.push(row);
           }); 
        });
        
        entry = entry.filter(function (row) {
           return !row.textContent; //무엇인가가 채워진 칸은 걸러내는 코드 
        });
        
        if (win) {
            gameResult(); //false일 경우에는 boolean형 매개변수를 비워두어도 같은 효과가 나타난다.
        } else if (entry.length === 0) {
            gameResult(true);
        } else {
            if (turn == "X")
                turn = "O";
            setTimeout(function () {
                var choice = entry[Math.floor(Math.random() * entry.length)];
                choice.textContent = turn;
                var colNum = columns.indexOf(choice.parentNode);
                var rowNum = rows[colNum].indexOf(choice);
                
                win = checkWinOption(colNum, rowNum);
                
                if (win) {
                    gameResult();
                }
                
                turn = "X";
            }, 1000);
        }
    }
}

for (var i = 1; i <= 3; i++) {
    var column = document.createElement("tr");
    columns.push(column);
    rows.push([]);
    for (var j = 1; j <= 3; j++) {
        var row = document.createElement("td");
        row.addEventListener("click", clickEvent);
        rows[i - 1].push(row);
        column.appendChild(row);
    }
    table.appendChild(column);
}

body.appendChild(table);
var resultWord = document.createElement("div");
resultWord.style.fontWeight = "bold";
body.append(resultWord);
