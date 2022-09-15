const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    password = document.querySelector("#password"),
    confirmPassword = document.querySelector("#confirm-password"),
    registerbtn = document.querySelector("#button");

registerbtn.addEventListener("click", register);

function register() {
    if (!id.value) return alert("enter ID");
    if (password.value !== confirmPassword.value) return alert("password not matched");

    const req = {
        id: id.value,
        name: name.value,
        password: password.value,
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    }).then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = "/login";
        } else {
            alert(res.msg);
        }
    })
    .catch(console.error(new Error("error occured")));
}