function power() {
    let bg = document.getElementById("menu");
    let power = document.getElementById("powerMenu");
    let body = document.getElementById("body");
    let background = document.getElementById('backgroundHome');
    bg.style.filter = ("blur(7px)");
    background.style.filter = ("blur(7px)");
    power.style.display = ("block");
    power.style.zIndex = ("10");
}

function exitPower() {
    let bg = document.getElementById("menu");
    let power = document.getElementById("powerMenu");
    let background = document.getElementById('backgroundHome');
    power.style.display = ("none");
    bg.style.filter = ("blur(0)");
    background.style.filter = ("blur(0)");
}


