//2019-07-04
//끝말잇기 프로그램
//prompt를 이용해 브라우저 자체에서 입력값을 사용자로부터 받고 이미 받은 값의
//끝 글자와 다음으로 입력받은 글자를 비교해 일치한다면 계속 진행하는 방식이다.
function goToGo() {
  //prompt함수를 이용해 제시어를 입력받는다.
  var word = prompt("첫 제시어를 입력해주세요.", word);
  var newWord = null;
  while (true) {
    newWord = prompt(word);
    if (word[word.length - 1] === newWord[0])
      word = newWord;
    else
      alert("제시된 단어와 이전 단어간의 끝말잇기 관계가 맞지 않습니다.");
  }
}

//appendChild메소드를 통해 끝말잇기 함수를 html에 넣어주게 된다.
document.body.appendChild(goToGo());
