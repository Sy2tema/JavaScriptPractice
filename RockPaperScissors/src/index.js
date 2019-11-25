/*eslint no-undef: "off"*/
var computer = document.querySelector("#computer");
var imageMatrix = 0; //이미지 스프라이트에서 가위바위보 분리

//인터벌 내에서 크기에 따라 가위바위보 여부를 파악하는 사전
var dictionary = {
    가위: "290px",
    바위: "0",
    보: "163px"
};

function computerChoice (imageMatrix) {
    return Object.entries(dictionary).find(function (value) {
       return value[1] === imageMatrix; 
    })[0];
}

//클릭 이벤트 내에서 가위바위보 여부를 쉽게 파악하기 위한 사전
//var RCP = {
//    "290px": "가위",
//    "0": "바위",
//    "163px": "보"
//};

//위 방식으로 사전을 두 개 만들 경우 한 사전에서 데이터가 변경되면
//사람이 직접 수정을 해줘야 한다는 문제점이 발생한다.
//Object.entries를 사용하면 사전을 다차원 배열의 형태로 저장하게 되어
//여러번 사전을 선언해 관리할 필요가 없게 된다.
//find메소드는 일종의 반복문 형태로 사전 내 해당하는 값을 찾게 된다.

//setTimeout과는 다르게 계속 반복해 실행하도록 하는 함수다.
//일정 시간 간격에 따라 스프라이트 내 이미지를 번갈아 출력한다.
var interval;
function makeInterval() {
    clearInterval(interval);
    interval = setInterval (function () {
        if (imageMatrix === dictionary.바위) {
            imageMatrix = dictionary.보;
            computer.style.width = "157px";
        } else if (imageMatrix === dictionary.보) {
            imageMatrix = dictionary.가위;
            computer.style.width = "120px";
        } else {
            imageMatrix = dictionary.바위;
            computer.style.width = "133px";
        }
        computer.style.background = "url(./image/RockPaperScissors.gif)" + imageMatrix + "  0"; 
    }, 50);
}

makeInterval();

var battleNum = {
    가위: 1,
    바위: 0,
    보: -1
};

//innerHTML을 이용해 현재 점수를 승패여부에 따라 계속 갱신한다.
var score = 0;
function setScore(resultString) {
    document.querySelector('#gameResult').innerHTML = resultString;
    document.querySelector('#scoreView').innerHTML = '현재 점수는 ' + score + '점 입니다.';
}

//querySelectorAll을 사용하면 여러 클래스같은 것들을 한 번에 불러올 수 있다.
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener ("click", function () {
        clearInterval(interval); //인터벌을 멈출 수 있다.
        
        setTimeout(function () {
            makeInterval();
        }, 1500);
        
        var myChoice = this.textContent;
        var resultString = '';

        //결과가 0이면 비김, 2나 -1일 경우 승리, 1이나 -2일 경우 패배
        var result = battleNum[myChoice] - battleNum[computerChoice(imageMatrix)];
    
        if (result === 0) {
            resultString = '비겼습니다.';
            setScore(resultString);
        } else if ([-1, 2].includes(result)) {
            resultString = '이겼습니다!';
            score++;
            setScore(resultString);
        } else {
            resultString = '졌습니다...';
            score--;
            setScore(resultString);
        }
    });
});