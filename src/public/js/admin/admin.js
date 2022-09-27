/**
 * check it is admin
 */
async function checkAdmin() {
    if (Cookies.get("userID") == undefined) {
        alert("로그인이 필요합니다.");
        location.href = "/";
        return;
    }

    const req = {
        id: Cookies.get("userID")
    };

    fetch("/admin/isAdmin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if (!res.admin) {
            alert("권한이 존재 않습니다.");
            location.href = "/";
            return;
        }
    })
    .catch((err) => {
        console.error(new Error("error occured : " + err.toString()));
    });
}
checkAdmin();

const dlBtn = document.querySelector(".deadline-btn"),
    resetBtn = document.querySelector(".reset-btn");

const aTable = document.querySelector(".answers");

/**
 * set Elements of name, rank, score
 */
async function setEles() {
    fetch("/admin/getScores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    .then((res) => res.json())
    .then((res) => {
        if(Object.keys(res).length == 0) return;
        for (var i = 10; i >= 11 - Object.keys(res).length; i--) {
            if (res[i].length == 0) continue;
            for (var info of res[i]) {
                var row = aTable.insertRow(aTable.rows.length);

                var name = row.insertCell(0);
                var score = row.insertCell(1);
                var rank = row.insertCell(2);

                name.innerHTML = info.name;
                score.innerHTML = info.score;
                rank.innerHTML = info.rank;
            }
            
        }
    })
    .catch((err) => {
        console.error(new Error("error occured : " + err.toString()));
    });

    fetch("/admin/getQuizIndex", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.index >= 10) {
            dlBtn.innerHTML = "모두 마감됨";
        }
        else {
            dlBtn.innerHTML = "마감 : " + (res.index + 1);
        }
    
    })
    .catch((err) => {
        console.error(new Error("error occured : " + err.toString()));
    });
}
setEles();

resetBtn.addEventListener("click", reset);
dlBtn.addEventListener("click", closeQuiz);

/**
 * reset the Database
 */
async function reset() {
    fetch("/admin/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    }).then(() => {
        alert("Database가 리셋되었습니다.");
        location.reload();
    });
}

/**
 * make deadline of quiz in current index
 */
async function closeQuiz() {
    fetch("/admin/closeQuiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    }).then((res) => {
        location.reload();
    });
    
}


