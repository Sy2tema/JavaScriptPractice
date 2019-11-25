//생성자와 팩토리 패턴 학습용
var enemy = {
    hero: document.getElementById("enemyHero"),
    deck: document.getElementById("enemyDeck"),
    field: document.getElementById("enemyCards"),
    cost: document.getElementById("enemyCost"),
    heroData: [], //영웅 카드부분을 초기회하는 변수
    deckData: [],
    fieldData: [],
    //선택된 카드의 데이터를 관리하기 위한 변수들
    selectedCard: null,
    selectedCardData: null
};

//dictionary를 활용해 객체화하면 데이터를 관리하기 편해진다.
var my = {
    hero: document.getElementById("myHero"),
    deck: document.getElementById("myDeck"),
    field: document.getElementById("myCards"),
    cost: document.getElementById("myCost"),
    heroData: [],
    deckData: [],
    fieldData: [],
    selectedCard: null,
    selectedCardData: null 
};

var turn = true; //플레이어의 턴인지 여부 파악
var turnButton = document.getElementById("changeTurn");

function init() {
    initMyDeck(5);
    initMyHero();
    initEnemyHero();
    reDraw();
    reDraw(true);
}

function initMyDeck(number) {
    my.deckData = [];
    my.fieldData = [];
    for (var i = 0; i < number; i++) {
        //영웅 카드는 아니나 내 카드임을 표시
        my.deckData.push(createCard(false, true));
    }
    my.deck.innerHTML = "";
    my.deckData.forEach(function (data) {
        connectCardDOM(data, my.deck);
    });
    
}
function initMyHero() {
    my.heroData = createCard(true, true);
    connectCardDOM(my.heroData, my.hero, true);
}

//숫자만큼 덱을 생성한다.
function initEnemyDeck(number) {
    enemy.deckData = [];
    enemy.fieldData = [];
    for (var i = 0; i < number; i++) {
        enemy.deckData.push(createCard());
    }
    enemy.deck.innerHTML = "";
    enemy.deckData.forEach(function (data) {
        connectCardDOM(data, enemy.deck);
    });
}
function initEnemyHero() {
    enemy.heroData = createCard(true);
    connectCardDOM(enemy.heroData, enemy.hero, true);
}

//각 턴의 행동을 수행하는 함수
function action(card, data, turn) {
    var myTeam = turn ? my : enemy;
    var enemyTeam = turn? enemy : my;
    
    //이미 공격이 완료된 카드는 재선택이 불가하다.
    if (card.classList.contains("cardTurnOver")) {
        return;
    }
    
    var enemyCard = turn ? !data.mine : data.mine;
    
    //내 카드이며 상대 카드를 선택하면 공격을 수행한다.
    if (enemyCard && myTeam.selectedCard) {
        if (!data.isHero) { //필드 카드끼리는 서로 공격처리한다.
            myTeam.selectedCardData.hp -= data.attack;
        }
        data.hp -= myTeam.selectedCardData.attack;
        var index;
        
        //적 카드가 죽을 때
        if (data.hp <= 0) {
            index = enemyTeam.fieldData.indexOf(data);
            if (index > -1) { //필드 카드가 죽었을 때
                enemyTeam.fieldData.splice(index, 1);
            } else { //영웅 카드가 죽었을 때는 인덱스를 찾을 수 없다.
                alert(turn ? '나의 승리' : '상대의 승리');
                init();
            }
        }

        //적과 아군의 카드 전투 결과를 다시 화면에 출력하기 위해 모든 필드를 다시 렌더링한다.
        reDraw(!turn);
        
        myTeam.selectedCard.classList.remove("cardSelected");
        myTeam.selectedCard.classList.add("cardTurnOver");
        myTeam.selectedCard = null;
        myTeam.selectedCardData = null;
        return;
    } else if (enemyCard) { //공격 모드가 아닌 상태에서 적 카드를 선택할 수 없음
        return;
    }
    
    if (data.isField) {
        //여러 카드가 선택되지 않도록 필드 카드로 올라간 후 cardSelected를 모두 지운 다음
        //새로이 클릭한 카드만 클래스를 부여하도록 한다.
        //프로그램 관점에서는 비효율적이라도 사람 관점에서 효율적인 것이 나은 방법일 수 있다.
        //이 코드를 사용할 시 querySelectorAll이 null이라는 에러를 뿜어내지만
        //사용하지 않으면 목표가 된 카드에 cardSelected클래스가 붙은 채 사라지지 않는다.
        document.querySelectorAll(".card").forEach(function (event) {
            event.classList.remove("cardSelected");
        });
        card.classList.add("cardSelected");
        myTeam.selectedCard = card;
        myTeam.selectedCardData = data;
    } else {
        moveDeckToField(card, data, turn);
    }
}

//필드를 새로 그리도록 해주는 함수
function reDraw(myTurn) {
    var obj = myTurn ? my : enemy;
    fieldRedraw(obj);
    deckRedraw(obj);
    heroRedraw(obj);
}
//상대와 나 전부의 덱과 필드를 다시 그리는 코드
function fieldRedraw(obj) {
    obj.field.innerHTML = '';
    obj.fieldData.forEach(function (data) {
        connectCardDOM(data, obj.field);
    });
}
function deckRedraw(obj) {
    obj.deck.innerHTML = '';
    obj.deckData.forEach(function (data) {
        connectCardDOM(data, obj.deck);
    });
}
function heroRedraw(obj) {
    obj.hero.innerHTML = '';
    connectCardDOM(obj.heroData, obj.hero, true);
}

//덱에서 필드로 이동시키는 함수
//해당 함수에서는 card변수를 쓰지 않아 대수롭지 않게 생각하고 받아오지 않도록 조치했다가
//모든 카드의 정보가 깨지는 불상사를 겪었다. 이를 통해 직접 사용하지 않더라도 정보를 받아오는 것만으로도
//본연의 쓰임을 다할 수도 있다는 것을 알 수 있었다.
function moveDeckToField(card, data, myTurn) {
    //삼항연산자를 이용해 나와 상대를 구별한다.
    var obj = myTurn ? my : enemy;
    
    //필드에 카드가 5개 이상 추가되지 않도록 하는 코드
    if (obj.fieldData.length === 5) {
        return;
    }
    
    var currentCost = Number(obj.cost.textContent);
    //누른 카드의 코스트가 남은 코스트보다 많으면 뽑지 않는다.
    if (currentCost < data.cost) {
        return;
    }
    
    //눌려진 카드가 명번 인덱스에 있는지 판단한다.
    //데이터와 화면을 일치시키기 위해서는 React등 프레임워크를 이용하자
    var index = obj.deckData.indexOf(data);
    obj.deckData.splice(index, 1); //해당 요소를 지우고
    obj.fieldData.push(data); //그 데이터를 추가한다.
    fieldRedraw(obj);
    deckRedraw(obj);
    
    data.isField = true;
    obj.cost.textContent = currentCost - data.cost;
}

//턴 종료 버튼을 눌렀을 때 반전을 통해 상대와 순서를 바꾼다.
turnButton.addEventListener("click", function () {
    var obj = turn ? my : enemy;
    document.getElementById("enemy").classList.toggle("turn");
    document.getElementById("my").classList.toggle("turn");
    fieldRedraw(obj);
    heroRedraw(obj);
    
    turn = !turn;
    //이쁘지 않게 모양이 들쑥날쑥한 것을 noTurn클래스를 추가해 해결했다.
    document.getElementById("my").classList.toggle("noTurn");
    document.getElementById("enemy").classList.toggle("noTurn");
    var comp = document.querySelector("#turn");
    if (turn) {
        comp.textContent = "내 턴";
        if (Number(my.cost.textContent) !== 10) {
            my.cost.textContent = 10;
        }
        my.deckData = [];
        
        initMyDeck(5);
    } else {
        comp.textContent = "상대 턴";
        if (Number(enemy.cost.textContent) !== 10) {
            enemy.cost.textContent = 10;
        }
        enemy.deckData = [];
        initEnemyDeck(5);
    }
});

//여러 카드를 생성하는 함수
function createCard(hero, mine) {
    return new Card(hero, mine);
}
//생성자의 맨 앞은 대문자로 쓰는 관행이 있다.
function Card(hero, mine) {
    if (hero) {
        this.attack = Math.ceil(Math.random() * 2);
        this.hp = 25;
        this.isHero = true; //영웅인지 여부를 반환
    } else {
        this.attack = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.attack + this.hp) / 2);
    }
    
    //내 카드인지 상대카드인지 구별하여 내 필드에 상대 카드가 들어가는 것을 방지
    if (mine) {
        this.mine = true;
    }
}

function connectCardDOM(data, dom, hero) {
    //cardHidden의 자식인 card클래스를 이용해 복제를 수행하는 코드
    var card = document.querySelector(".cardHidden .card").cloneNode(true);
    card.querySelector(".cardCost").textContent = data.cost;
    card.querySelector(".cardAttack").textContent = data.attack;
    card.querySelector(".cardHealthPoint").textContent = data.hp;
    if (hero) {
        card.querySelector(".cardCost").style.display = "none";
        var name = document.createElement("div");
        name.textContent = "영웅";
        data.isField = true;
        card.appendChild(name);
    }
    
    //덱에서 카드를 추가하면 추가 공격이 가능하다는 버그
    //상대 영웅을 클릭하면 스스로 공격하는 버그
    //영웅과 필드의 카드가 중복 선택되는 버그 (이 때는 필드 카드가 공격한다.)
    card.addEventListener("click", function () {
        action(card, data, turn);
    });
    
    dom.appendChild(card);
}

init();