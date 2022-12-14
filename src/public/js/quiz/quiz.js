const quizIndex = document.querySelector("#index"),
    scoreL = document.querySelector("#score"),
    lateM = document.querySelector("#lateM");

const btn1 = document.querySelector("#guess1"),
    btn2 = document.querySelector("#guess2"),
    btn3 = document.querySelector("#guess3"),
    btn4 = document.querySelector("#guess4"),
    exitBtn = document.querySelector("#exit");

const nameL = document.querySelector("#username");

nameL.innerHTML = Cookies.get("quizName");

btn1.addEventListener('click', () => submitAnswer(1));
btn2.addEventListener('click', () => submitAnswer(2));
btn3.addEventListener('click', () => submitAnswer(3));
btn4.addEventListener('click', () => submitAnswer(4));
exitBtn.addEventListener('click', () => location.href = "/");

var index = 1;
var answers = {};
var isSubmitting = { bool: false };
quizIndex.innerHTML = index.toString();

lateM.hidden = true;

function late(num) {
    lateM.hidden = false;
    lateM.classList.add("show");
    lateM.classList.remove("lateIdle");
    setTimeout(() => {
        lateM.hidden = true;
        lateM.classList.add("remove");
    }, 500);
}

function submitAnswer(num) {
    if (isSubmitting.bool) return;
    isSubmitting.bool = true;
    fetch("/quiz/isLate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ index: index })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.isLate) {
            late();
            answers[index] = -1;
        }
        else {
            answers[index] = num;
        }

        if (index >= 10) {
            quizIndex.hidden = true;
                btn1.hidden = true;
                btn2.hidden = true;
                btn3.hidden = true;
                btn4.hidden = true;
            
            const req = {
                id: Cookies.get("quizID"),
                name: Cookies.get("quizName"),
                answer: answers
            }
    
            fetch("/quiz/sendAnswer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
            .then((res) => res.json())
            .then((res) => {
                scoreL.innerHTML = res.score;
                scoreL.hidden = false;
            })
            .catch((err) => {
                console.error(new Error("error occured : " + err.toString()));
            });
            return;
        }
        index++;
        quizIndex.innerHTML = index.toString();
        isSubmitting.bool = false;
    })
    .catch((err) => {
        console.error(new Error("error occured : " + err.toString()));
        return null;
    });
}