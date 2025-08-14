let gameSeq = [];
let userSeq = [];
let btns = ["grey", "pastel", "red", "blue"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

// Start game on key press
document.addEventListener("keydown", function() {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("user");
    setTimeout(() => btn.classList.remove("user"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `LEVEL ${level}`;

    let randIndx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    console.log("Game sequence:", gameSeq);

    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => document.body.style.backgroundColor = "white", 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
