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
    location.href = "/quiz";
}

function go_admin() {
    alert("z");
}




