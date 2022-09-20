const loginbtn = document.querySelector(".login-btn"),
    adminbtn = document.querySelector(".admin-btn"),
    quizbtn = document.querySelector(".quiz-btn");

const infoBlock = document.querySelector(".login-info");
const idLabel = document.querySelector("#id"),
    nameLabel = document.querySelector("#name");

if (Cookies.get("userID") == undefined || Cookies.get("userName") == undefined) {
    idLabel.hidden = true;
    nameLabel.hidden = true;
    loginbtn.addEventListener("click", go_login);
}
else {
    idLabel.innerHTML = "ID : " + Cookies.get("userID");
    nameLabel.innerHTML = "Name : " + Cookies.get("userName");
    loginbtn.innerHTML = "로그아웃";
    loginbtn.addEventListener("click", logout);
}

adminbtn.addEventListener("click", go_admin);
quizbtn.addEventListener("click", go_quiz);

function logout() {
    Cookies.remove("userID");
    Cookies.remove("userName");
    location.href = "/";
}

function go_login() {
    location.href = "/login";
}

function go_quiz() {
    if (Cookies.get("userID") == undefined || Cookies.get("userName") == undefined) {
        const tempName = prompt('임시 아이디(이름)을 입력해주세요.');
        if (tempName == null) return;
        
        const req = {
            id: tempName,
        };

        console.log(tempName);

        fetch("/isExisting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.exist) {
                alert("이미 존재하는 ID입니다.");
            } else {
                Cookies.set("quizID", tempName);
                Cookies.set("quizName", tempName);
                location.href = "/quiz";
            }
        })
        .catch((err) => {
            console.error(new Error("error occured : " + err.toString()));
        });
    }
    else {
        Cookies.set("quizID", Cookies.get("userID"));
        Cookies.set("quizName", Cookies.get("userName"));
        location.href = "/quiz";
    }   
}

function go_admin() {
    location.href = "/admin";
}




