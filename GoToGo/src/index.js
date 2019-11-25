var body = document.body;
var word = document.createElement('div');
word.textContent = '첫 번째 단어를 입력해주세요.';
body.append(word);
var result = document.createElement('div');
body.append(result);
var form = document.createElement('form');
body.append(form);
var input = document.createElement('input');
form.append(input);
var button = document.createElement('button');
button.textContent = '입력';
form.append(button);

//이벤트 리스너를 이용해 버튼을 입력했을때 끗말잇기를 한 번 수행하도록 하였다.
//이 때 form을 이용해 입력창과 버튼을 감쌌기 때문에 form.addEventListener의 형식으로 작성해야 한다.
//또한 버튼과는 다르게 form은 enter를 통해 정보 입력이 가능해진다. 이는 submit을 활용하면 된다.
//submit은 정보를 입력할 때 무조건 새로고침되는 것이 기본이다. 이를 방지하기 위해서는 preventDefault메소드를 활용하면 된다.
form.addEventListener('submit', function submitEvent (e) {
  e.preventDefault();
  if (word.textContent[word.textContent.length - 1] === input.value[0]) {
    result.textContent = '잘 하셨습니다';
    word.before(word.textContent);
    word.before(document.createElement('br')); //줄바꿈을 수행하기 위해 br태그를 생성한다.
    word.textContent = input.value;
    input.value = '';
    input.focus(); //focus메소드를 이용해 이벤트가 끝났을 때 입력창에 포커스를 맞추어 사용자 편의성을 높인다.
  } else if (word.textContent === '첫 번째 단어를 입력해주세요.') {
    word.textContent = input.value;
    result.textContent = '잘 하셨습니다.';
    input.value = '';
    input.focus();
  } else {
    result.textContent = '끝말잇기의 형식이 잘못되었습니다.';
    input.value = '';
  }
});
