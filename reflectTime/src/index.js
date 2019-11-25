/*eslint no-undef: "off"*/
var screen = document.querySelector("#screen");
//함수가 끝나면 지역 변수에 저장되었던 모든 데이터들은 날아간다.
//이를 방지하기 위해 전역변수를 선언하여 작업이 끝난 후에도 데이터가 사라지지 않도록 한다.
var startTime, endTime;
var resultHistory = [];
var steady;

//반응속도들의 평균을 화면에 출력하기 위한 함수
function gameResult() {
    var reactionRate = 0;
    resultHistory.forEach(function (value) {
        reactionRate += value;
    });

    document.querySelector('#result').innerHTML = "반응 속도의 평균은 " + (reactionRate / resultHistory.length) + "ms 입니다.";
}

screen.addEventListener("click", function () {
    //contains메소드를 통해 현재 어떤 클래스 상태인지 알 수 있다.
    if (screen.classList.contains("wait")) {
        screen.classList.remove("wait");
        screen.classList.add("ready");
        //클래스를 이용하면 여러 가지 스타일을 간편하게 교체할 수 있다는 장점이 있다.
        screen.textContent = "초록색이 되면 클릭하세요.";
        steady = setTimeout(function () {
            startTime = new Date();
            //jQuery의 메소드인 click은 선택된 요소가 클릭되었을 때 특정한 작업을 수행할 수 있도록 해준다.
            screen.click();
        }, Math.floor(Math.random() * 1500) + 2000);
    } else if (screen.classList.contains("ready")) {
        //!startTime이라 하면 이 변수의 값이 0, undefined, null, NaN, false중 하나인지 검사한다.
        if (!startTime) { //클릭 화면이 나오기 전에 클릭했을 경우 아직 시작시간이 생성되지 않는다.
            clearTimeout(steady);
            screen.classList.remove("ready");
            screen.classList.add("error");
            screen.textContent = "너무 빨리 누르셨습니다.";
        } else {
            screen.classList.remove("ready");
            screen.classList.add("stop");
            screen.textContent = "지금입니다!";
        }
    } else if (screen.classList.contains("stop")) {
        endTime = new Date();
        var resultTime = endTime - startTime;
        resultHistory.push(resultTime);
        gameResult();
        screen.textContent = "결과는" + resultTime + "ms 입니다.";
        startTime = null;
        endTime = null;
        screen.classList.remove("stop");
        screen.classList.add("result");
    } else if (screen.classList.contains("result")) {
        screen.classList.remove("result");
        screen.classList.add("wait");
        screen.textContent = "클릭해서 시작하세요."
    } else if (screen.classList.contains("error")) {
        screen.classList.remove("error");
        screen.classList.add("wait");
        screen.textContent = "클릭해서 시작하세요.";
    }
});