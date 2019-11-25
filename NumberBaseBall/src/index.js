/*eslint no-undef: "off"*/
//10번의 기회 안에 제시된 숫자를 맞추는 프로그램
var numArray;
var questionArray;
var count;
var strike, ball;

makeQuestion();

var body = document.body;
var word = document.createElement("div");
word.textContent = "문제가 출제되었습니다.(4자리 숫자이며 중복 없음.)";
body.append(word);
var strikeBall = document.createElement("h1");
body.append(strikeBall);
var result = document.createElement("div");
body.append(result);
var form = document.createElement("form");
body.append(form);
var input = document.createElement("input");
input.type = "number";
input.maxLength = 4;
form.append(input);
var submitButton = document.createElement("button");
submitButton.textContent = "제출";
form.append(submitButton);

form.addEventListener("submit", function submitEvent(e) {
    e.preventDefault();
    var answer = input.value;
    strike = 0, ball = 0;
    
    //join을 이용해 숫자 배열의 각 요소들을 합친다.
    if (answer === questionArray.join("")) {
        word.textContent = "";
        strikeBall.textContent = "홈런! 정답까지 소모한 기회 : " + (10 - (--count));
        input.value = "";
        input.focus();
        makeQuestion();
        body.append(answer);
        body.append("다음 게임");
        body.append(document.createELement("br"));
    } else {
        for (var i = 0; i < 4; i++) {
            if (Number(answer[i]) === questionArray[i])
                strike++;
            else if (questionArray.indexOf(Number(answer[i])) != -1)
                ball++;
        }
        input.value = "";
        input.focus();
        
        if (count == 0) {
            result.textContent = "기회를 모두 소모하였습니다. 정답은 " + questionArray.join("") + "입니다.";
            strikeBall.textContent = strike + "스트라이크 " + ball + "볼 입니다.";
            makeQuestion();
        } else {
            word.textContent = "남은 기회는 " + (--count) + "번입니다.";
            strikeBall.textContent = strike + "스트라이크 " + ball + "볼 입니다.";
        }
        
        body.append(answer + ' : ' + strike +'S ' + ball + 'B');
        body.append(document.createElement("br"));
    }
});

function makeQuestion() {
    numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    questionArray = [];
    count = 10;
    for (var i = 0; i < 4; i++) {
        //내림을 이용해 인덱스 1부터 9까지의 요소를 꺼낸다.
        //또한 9 - i를 통해 꺼내진 요소만큼 제거한 인덱스에서 꺼낸다.
        var choice = numArray.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        questionArray.push(choice);
    }
}