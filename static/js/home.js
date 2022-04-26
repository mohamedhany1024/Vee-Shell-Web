let powerMenu = document.getElementById("powerMenu");
powerMenu.style.display = "none";

const colorThief = new ColorThief();
const img = document.getElementById("bgImg");
let dominantColor;
if (img.complete) {
    dominantColor = colorThief.getColor(img);
    let r = dominantColor[0], g = dominantColor[1], b = dominantColor[2];
    let dR = r * (3 / 4), dG = g * (3 / 4), dB = b * (3 / 4);
    let vR = r * (1 / 2), vG = g * (1 / 2), vB = b * (1 / 2);
    let keys = document.getElementsByClassName("key");
    for (i = 0; i < keys.length; i++) {
        keys[i].style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    }
    document.getElementById("navBar").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("toggleVBoard").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("vBoard").style.backgroundColor = "rgb(" + dR + "," + dG + "," + dB + ")";
    document.getElementById("key").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("hidden").style.backgroundColor = "rgb(" + vR + "," + vG + "," + vB + ")";
} else {
    img.addEventListener('load', function () {
        dominantColor = colorThief.getColor(img);
        let r = dominantColor[0], g = dominantColor[1], b = dominantColor[2];
        let dR = r * (3 / 4), dG = g * (3 / 4), dB = b * (3 / 4);
        let vR = r * (1 / 2), vG = g * (1 / 2), vB = b * (1 / 2);
        let keys = document.getElementsByClassName("key");
        for (i = 0; i < keys.length; i++) {
            keys[i].style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        }
        document.getElementById("navBar").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        document.getElementById("toggleVBoard").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        document.getElementById("vBoard").style.backgroundColor = "rgb(" + dR + "," + dG + "," + dB + ")";
        document.getElementById("key").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        document.getElementById("hidden").style.backgroundColor = "rgb(" + vR + "," + vG + "," + vB + ")";
    });
}





setInterval(updateTime, 1000)
function updateTime() {
    let time = new Date();
    let hrs = time.getHours();
    let amOrpm = "AM";
    if (hrs > 12) {
        hrs = hrs - 12;
        amOrpm = "PM";
    }

    if (hrs == 0) {
        hrs = 12
        amOrpm = "AM"
    }
    document.getElementById("clock").innerText = hrs + ":" + time.getMinutes() + ":" + time.getSeconds() + " " + amOrpm;
}

function power() {
    let bg = document.getElementById("menu");
    let power = document.getElementById("powerMenu");
    let body = document.getElementById("body");
    let background = document.getElementById('backgroundHome');
    bg.style.filter = ("blur(13px)");
    background.style.filter = ("blur(13px)");

    power.style.display = ("block");
    setTimeout(() => {
        power.classList.toggle("powerOptions--activated");
    }, 10);
    power.style.zIndex = ("10");
}

function exitPower() {
    let bg = document.getElementById("menu");
    let power = document.getElementById("powerMenu");
    let background = document.getElementById('backgroundHome');
    power.classList.toggle("powerOptions--activated");
    setTimeout(() => {
        power.style.display = ("none");
    }, 400);
    bg.style.filter = ("blur(0)");
    background.style.filter = ("blur(0)");
}
let appViewer = document.getElementById("appViewer");
function openApp(appName) {

    appViewer.src = appName;


}

function showAppViewer() {
    appViewer.style.display = "block";
}

let appsState = 1;

function toggleApps() {
    let apps = document.getElementById("menu");
    let clockContainer = document.getElementById("clock-container");
    let clock = document.getElementById("clock");
    if (appsState == 1) {
        apps.style.display = "block";
        clockContainer.classList.toggle("clock-container--opened");

        //apps.classList.toggle("menu--collapse");
        setTimeout(() => {
            clockContainer.style.display = "none";
            setTimeout(() => {
                apps.classList.toggle("menu--collapse");
            }, 10);
        }, 400);


        appsState = 0;
        console.log(appsState);

    } else {
        clockContainer.style.display = "block";

        apps.classList.toggle("menu--collapse");
        appsState = 1;
        console.log(appsState);
        setTimeout(() => {
            apps.style.display = "none";
            clockContainer.classList.toggle("clock-container--opened");
        }, 400);
    }
}

