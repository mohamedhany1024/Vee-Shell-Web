let powerMenu = document.getElementById("powerMenu");
powerMenu.style.display = "none";

function power() {
    let bg = document.getElementById("menu");
    let power = document.getElementById("powerMenu");
    let body = document.getElementById("body");
    let background = document.getElementById('backgroundHome');
    bg.style.filter = ("blur(13px)");
    background.style.filter = ("blur(13px)");
    
    power.style.display = ("block");
    setTimeout(()=> {
        power.classList.toggle("powerOptions--activated");
    }, 10);
    power.style.zIndex = ("10");
}

function exitPower() {
    let bg = document.getElementById("menu");
    let power = document.getElementById("powerMenu");
    let background = document.getElementById('backgroundHome');
    power.classList.toggle("powerOptions--activated");
    setTimeout(()=> {
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
    if (appsState == 1) {
        apps.style.display = "block";
        setTimeout(()=>{
            apps.classList.toggle("menu--collapse");
        }, 10);
        
        appsState = 0;
        console.log(appsState);
        
    } else {
        apps.classList.toggle("menu--collapse");
        appsState = 1;
        console.log(appsState);
        setTimeout(()=> {
            apps.style.display = "none";
        }, 400);
    }
}

