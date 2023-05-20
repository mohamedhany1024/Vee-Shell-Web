let promptSound = new Audio("/static/sounds/prompt.wav");
document.getElementById("screenRes").innerHTML = ("Screen Resolution: " + screen.width + "X" + screen.height);


function clearAll() {
    openDialogue("prompt");
    promptSound.play();
}

function clearData () {
    localStorage.removeItem("selectedWallpaper");
    closeDialogue("prompt");
}

function cancel() {
    let prompt = document.getElementById("prompt");
    prompt.style.display = ("none");
}

function about() {
    let options = document.getElementById("options");
    let about = document.getElementById("about");
    let btn = document.getElementById("btn");
    options.style.display = ("none");
    about.style.display = ("block");
    btn.style.display = ("inline");
}

function storage() {
    let options = document.getElementById("options");
    let clear = document.getElementById("clear");
    let btn = document.getElementById("btn");
    let storageOption = document.getElementById("storage");
    storageOption.style.display = ("block");
    options.style.display = ("none");
    btn.style.display = ("inline");
    clear.style.display = ("block");
}

function back() {
    /*let options = document.getElementById("options");
    let about = document.getElementById("about");
    let btn = document.getElementById("btn");
    about.style.display = ("none");
    options.style.display = ("block");
    btn.style.display = ("none");*/
    //window.location.href = "/templates/settings.html";
}

function wallpaper() {
    let wallpaper = document.getElementById("wallpaper");
    let options = document.getElementById("options");
    let about = document.getElementById("about");
    let btn = document.getElementById("btn");
    options.style.display = ("none");
    btn.style.display = ("inline");
    wallpaper.style.display = ("block");
    
}
