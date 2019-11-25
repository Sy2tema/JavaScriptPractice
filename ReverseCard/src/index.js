var column = 3;
var row = 4;
var cardBackColorList = ["darkorange", "blueviolet", "chartreuse", "darkgoldenrod", "deeppink", "firebrick", "darkorange", "blueviolet", "chartreuse", "darkgoldenrod", "deeppink", "firebrick"];
var colors = cardBackColorList.slice(); //slice를 이용해 객체간 참조관계를 제거할 수 있다.
var cardBackColor = [];
var isClicked; //클릭되었는지 여부를 주어 true인 경우에만 클릭이 가능하도록
var pairCard = []; //고른 카드를 저장하는 변수
var correctCard = [];
var startTime;
var clearTimesList = [];

function shuffle() {
    for (var i = 0; colors.length > 0; i++) {
        cardBackColor = cardBackColor.concat(colors.splice(Math.floor(Math.random() * colors.length), 1));
    }
}

function reset() {
    //카드게임을 덮고 있는 back을 비워주며 초기화를 진행한다.
    document.querySelector("#back").innerHTML = "";
    colors = cardBackColor.slice();
    correctCard = [];
    cardBackColor = [];
    startTime = null;
}

function viewGameResult(endTime) {
    var clearTime = (endTime - startTime) / 1000;
    var average = 0;
    clearTimesList.push(clearTime);
    document.querySelector('#gameResult').innerHTML = "총 " + clearTime + "초 걸렸습니다.";

    clearTimesList.forEach(function (value) {
        average += value;
    });

    document.querySelector('#resultsAverage').innerHTML = "클리어한 시간들의 평균은 " + average + "초입니다.";
}

function cardSetting(column, row) {
    isClicked = false;
    for (var i = 0; i < column * row; i++) {
        var card = document.createElement("div");
        card.className = "card"; //classList를 활용하는 경우는 여러 클래스를 등록하기 위해
        //하나의 클래스만 등록할 때는 className을 이용하는 것이 더 편하다.
        var cardInner = document.createElement("div");
        cardInner.className = "cardInner";
        var cardFront = document.createElement("div");
        cardFront.className = "cardFront";
        var cardBack = document.createElement("div");
        cardBack.className = "cardBack";
        cardInner.appendChild(cardFront);
        cardBack.style.background = cardBackColor[i];
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function (e) {
            card.addEventListener("click", function () {
                if (isClicked && !correctCard.includes(e)) { //완섣카드가 아닐때는 클릭이 가능
                    e.classList.toggle("flipped");
                    pairCard.push(e);
                    if (pairCard.length === 2) {
                        //같은 카드를 두 번 선택했을 경우 완성 카드에 페어가 올라가지 못하도록 처리한다.
                        if (pairCard[0].querySelector(".cardBack") === pairCard[1].querySelector(".cardBack")) {
                            pairCard = [];
                        }
                        else if (
                            pairCard[0].querySelector(".cardBack").style.background
                            === pairCard[1].querySelector(".cardBack").style.background
                        ) {
                            correctCard.push(pairCard[0]);
                            correctCard.push(pairCard[1]);
                            pairCard = [];
                            if (correctCard.length === column * row) {
                                var endTime = new Date();
                                viewGameResult(endTime);
                                alert('성공!');
                                reset();
                                shuffle();
                                cardSetting(column, row);
                            }
                        } else { //짝이 맞지 않다면
                            isClicked = false;
                            setTimeout(function () {
                                pairCard[0].classList.remove("flipped");
                                pairCard[1].classList.remove("flipped");
                                isClicked = true;
                                pairCard = [];
                            }, 1500);
                        }
                    }
                }
                
            });
        })(card);
        
        document.querySelector("#back").appendChild(card);
    }
    
    //처음 실행되었을 때 일정 시간동안 카드 전체를 보여주어 사용자가 외울 수 있는
    //시간을 준다.
    document.querySelectorAll(".card").forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add("flipped");
        }, 1000 + 100 * index);
        setTimeout(function () {
            document.querySelectorAll(".card").forEach(function (card) {
               card.classList.remove("flipped");
            });
            isClicked = true; //초기 세팅이 끝나 클릭이 가능하도록 만든다.
            startTime = new Date();
        }, 5000);
    });
}

shuffle();
cardSetting(column, row);