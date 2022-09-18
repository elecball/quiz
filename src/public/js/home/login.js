const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginbtn = document.querySelector(".login-btn");

loginbtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        password: password.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            Cookies.set("userID", res.userInfo.id);
            Cookies.set("userName", res.userInfo.name);
            location.href = "/"; // 대충 성공
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("error occured : " + err.toString()));
    });
}