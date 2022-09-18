const quizIndex = document.querySelector("#index"),
    score = document.querySelector("#score");

const btn1 = document.querySelector("#guess1"),
    btn2 = document.querySelector("#guess2"),
    btn3 = document.querySelector("#guess3"),
    btn4 = document.querySelector("#guess4");

const nameL = document.querySelector("#username");

nameL.innerHTML = Cookies.get("quizName");

btn1.addEventListener('click', () => submitAnswer(1));
btn2.addEventListener('click', () => submitAnswer(2));
btn3.addEventListener('click', () => submitAnswer(3));
btn4.addEventListener('click', () => submitAnswer(4));

var index = 1;
quizIndex.innerHTML = index.toString();

function submitAnswer(num) {
    index++;
    quizIndex.innerHTML = index.toString();
}