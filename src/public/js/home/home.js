const loginbtn = document.querySelector(".login-btn"),
    adminbtn = document.querySelector(".admin-btn");

loginbtn.addEventListener("click", go_login);
adminbtn.addEventListener("click", go_admin);

function go_login() {
    location.href = "/login";
}

function go_admin() {
    alert("z");
}