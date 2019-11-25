/*eslint no-undef: "off"*/
var body = document.body;
//45크기 배열을 생성 후 undefined를 모두 채우는 과정을 한 줄에 합쳐 추가 변수 생성을 막는다.
var lotteryNumber = Array(45)
    .fill()
    .map(function(element, index) {
        return index + 1;
    });

var shuffle = [];
//Math.random은 실제로는 일정한 규칙에 의해 숫자를 뽑기 때문에 실제 랜덤을 사용하기 위해서는 완전한 랜덤을 구현하는 알고리즘에 의해 스스로 코드를 작성하거나 랜덤을 구현한 라이브러리를 사용하는 것이 좋다.
while (lotteryNumber.length > 0) {
    var choice = lotteryNumber.splice(Math.floor(Math.random() * lotteryNumber.length), 1)[0];
    shuffle.push(choice);
}

function drawBall (name, number) {
    var ball = document.createElement("div");
    ball.textContent = number;
    ball.style.display = "inline-block";
    ball.style.border = "1px solid black";
    ball.style.borderRadius = "20px";
    ball.style.width = "25px";
    ball.style.height = "25px";
    ball.style.textAlign = "center";
    ball.style.marginRight = "10px";
    ball.style.marginTop = "10px";
    ball.style.marginBottom = "10px";
    
    var backgroundColor;
    if (number <= 10)
        backgroundColor = "red";
    else if (number <= 20)
        backgroundColor = "orange";
    else if (number <= 30)
        backgroundColor = "yellow";
    else if (number <= 40)
        backgroundColor = "blue";
    else
        backgroundColor = "green";
    ball.style.background = backgroundColor;
    name.appendChild(ball);
}

var bonusNumber = shuffle[shuffle.length - 1];
//인덱스0부터 뒤로 6개의 숫자까지 선택한다는 뜻으로 slice메소드에서 마지막 인덱스 (여기서는 인덱스6)는 고르지 않는다.
//로또는 가장 작은 수부터 오름차순으로 화면에 보여줘야 하기 때문에 sort를 통해 뽑은 숫자들을 정렬했다.
var choiceNumbers = shuffle.slice(0, 6).sort(function (number1, number2) {return number1 - number2;});
//    .sort(function (a, b) {
//        return a - b
//    }); 
//sort를 이용하면 결과를 오름차순이나 내림차순으로 정렬할 수 있다. 

var result = document.getElementById("result");

//i를 선언할 때 var이 아닌 let을 사용해도 클로저 문제를 해결할 수 있다.
for (var i = 0; i < choiceNumbers.length; i++) {
    function closer (e) {
        setTimeout(function () {
            drawBall(result, choiceNumbers[e]);
        }, (e + 1) * 1000);
    }
    
    closer(i);
}

var bonusWord = document.getElementsByClassName("bonus")[0];

setTimeout(function () {
    drawBall(bonusWord, bonusNumber);
}, 7000);