function power() {
    let bg = document.getElementById("menu");
    let power = document.getElementById("powerMenu");
    let body = document.getElementById("body");
    bg.style.filter = ("blur(5px)");
    power.style.display = ("block");
    power.style.zIndex = ("10");
}

function exitPower() {
    let bg = document.getElementById("menu");
    let power = document.getElementById("powerMenu");
    power.style.display = ("none");
    bg.style.filter = ("blur(0)")
}


