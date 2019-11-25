var number1 = Math.ceil(Math.random() * 9);
var number2 = Math.ceil(Math.random() *9);
var multify = number1 * number2;
var correct = 0, wrong = 0;

var body = document.body;
var word = document.createElement("div");
word.textContent = number1 + " X " + number2 + "는?";
body.append(word);
var correctWord = document.createElement("div");
body.append(correctWord);
var wrongWord = document.createElement("div");
body.append(wrongWord);

var form = document.createElement("form");
body.append(form);
var input = document.createElement("input");
form.append(input);
input.focus();
var submitButton = document.createElement("button");
submitButton.textContent = "입력";
form.append(submitButton);

var resultWord = document.createElement("div");
body.append(resultWord);

form.addEventListener("submit", function submitEvent(e) {
  e.preventDefault();

  if (multify === Number(input.value)) {
    resultWord.textContent = "정답입니다.";
    correctWord.textContent = "맞은 횟수 : " + (++correct);
    wrongWord.textContent = "틀린 횟수 : " + wrong;

    number1 = Math.ceil(Math.random() * 9);
    number2 = Math.ceil(Math.random() *9);
    multify = number1 * number2;
    word.textContent = number1 + " X " + number2 + "는?";
    input.value = "";
    input.focus();
  } else {
    resultWord .textContent = "틀렸습니다. 정답은 " + multify + "입니다.";
    correctWord.textContent = "맞은 횟수 : " + correct;
    wrongWord.textContent = "틀린 횟수 : " + (++wrong);

    number1 = Math.ceil(Math.random() * 9);
    number2 = Math.ceil(Math.random() *9);
    multify = number1 * number2;
    word.textContent = number1 + " X " + number2 + "는?";
    input.value = "";
    input.focus();
  }
});
