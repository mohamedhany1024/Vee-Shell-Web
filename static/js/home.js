let powerMenu = document.getElementById("powerMenu");
powerMenu.style.display = "none";

const colorThief = new ColorThief();
const img = document.getElementById("bgImg");
let dominantColor;
let colorFetched = false;
let opennedApps = new Set();

let currentAppView;
let r = 0, g = 0, b = 0;
if (img.complete) {
    dominantColor = colorThief.getColor(img);
     r = dominantColor[0], g = dominantColor[1], b = dominantColor[2];
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
    colorFetched = true;
} else {
    img.addEventListener('load', function () {
        dominantColor = colorThief.getColor(img);
        r = dominantColor[0], g = dominantColor[1], b = dominantColor[2];
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
        colorFetched = true;
    });
}


function getAccentColor() {
    let colorObject = [r, g, b];

    
    if (colorFetched) {
        return colorObject;
    }
    
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

    power.style.display = ("flex");
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
let appCont = document.getElementById("appContainer");
function openApp(appName) {

    
    if (!opennedApps.has(appName)) {
        //appCont.innerHTML += `<iframe class="appViewer" id="app-${appName}"></iframe>`;
        appCont.insertAdjacentHTML("afterbegin", `<iframe class="appViewer" id="app-${appName}"></iframe>`);
        //viewers.push(`app-${appName}`);
        currentAppView = `app-${appName}`;
        document.getElementById(`app-${appName}`).src = "/" + appName;
        //showAppViewer(`app-${appName}`);
    } else {
        showAppViewer(`app-${appName}`);
    }
    
    opennedApps.add(appName);


}

function clearApps() {
    opennedApps.clear();
    appCont.innerHTML = "";
    appCont.style.display = "none";
}

function getCurrentAppID() {
    //return viewers[viewers.length - 1];
    return currentAppView;
}

function showAppViewer(appViewerID) {

    let appViewers = document.getElementsByClassName("appViewer");

    for(i = 0; i< appViewers.length; i++) {
        appViewers[i].style.display = "none";
    }
    document.getElementById(appViewerID).style.display = "block";

    document.getElementById("appContainer").style.display = "block";
    //appViewer.style.transform = "scale(1)";
    
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

let recentsOverlay = document.getElementById("recentsOverlay");
let recents = document.getElementById("recentApps");
let noApps = document.getElementById("noApps");
function showRecents() {
    recents.innerHTML = "";
    
    if (opennedApps.size == 0) {
        //document.getElementById("recentsOverlay").insertAdjacentHTML("afterbegin", "<div class='' id='noApps'><p class='label'>No Recent Apps.</p></div>");
        document.getElementById("noApps").style.display = "block";
    } else {
        document.getElementById("noApps").style.display = "none";
    }

    opennedApps.forEach((val)=> {
        recents.innerHTML+= `<div class="btn" onclick="openApp('${val}')"><p>${val}</p></div>`;
    })


    
    recentsOverlay.style.display = "block";
    setTimeout(()=> {
        recentsOverlay.style.opacity = "1";
        recentsOverlay.style.backdropFilter = "blur(12px)";
    }, 10);
}

function hideRecents() {
    recentsOverlay.style.opacity = "0";
    
    setTimeout(()=> {
        recentsOverlay.style.display = "none";
        recentsOverlay.style.backdropFilter = "";
    }, 400);
}

let recentsStatus = 0;
function toggleRecents() {
    if (recentsStatus == 0) {
        showRecents();
        recentsStatus = 1;
    } else {
        hideRecents();
        recentsStatus = 0;
    }
}

