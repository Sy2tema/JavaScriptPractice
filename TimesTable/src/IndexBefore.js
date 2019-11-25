function guGuDan() {
  var number1, number2, multify, answer, correct = 0, wrong = 0;

  while (true) {
    number1 = Math.ceil(Math.random() * 9) + 1;
    number2 = Math.ceil(Math.random() * 9) + 1;
    multify = number1 * number2;
    answer = prompt(number1 + " X " + number2 + "의 정답은?");

    if (multify === Number(answer)) {
      alert("정답입니다.\n맞은 횟수 : " + Number(++correct) + "\n틀린 횟수 : " + Number(wrong));
    } else if (answer === null || answer === "") {
      alert("프로그램을 종료합니다.");
      break;
    } else {
      alert("틀렸습니다. 정답은 " + multify + "입니다.\n맞은 횟수 : " + Number(correct) + "\n틀린 횟수 : " + Number(++wrong));
    }
  }
}

document.body.appendChild(guGuDan());
