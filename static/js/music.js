let audioPlayer = new Audio;
let audioPath = "";
let maxId = 0;
let currentId = 0;
let expansion = false;
const jsmediatags = window.jsmediatags;
$.get("/listMusic", (data) => {

    for (i = 0; i < data.length; i++) {
        document.getElementById("main").innerHTML += "<p class='btn audioFile' onclick='playAudio(this.id)' id='" + i + "' audio--src='" + data[i][1] + "'>" + data[i][0] + "</p>";
    }
    document.getElementById("main").innerHTML += "<br><br><br>";
    maxId = data.length-1;
})

document.getElementById("body").innerHTML += "<div class='controlBar' id='controlBar'><img id='play' width='20' onclick='togglePlayer()'><p id='mLabel'></p></div>";
let playButton = document.getElementById("play");
let playButton2 = document.getElementById("play2");
playButton.src = "static/images/play_ico.png"
let colors = parent.getAccentColor();
let CRF = (3 / 4)
let controlBar = document.getElementById("controlBar");
let playerCover = document.getElementById("playerCover");
document.getElementById("mLabel").addEventListener("click", () => {
    controlBar.style.display = "none";
    openScreen("playerPage");
    expansion = true;
})

document.getElementById("shrinkBtn").addEventListener("click", () => {
    controlBar.style.display = "grid";
    openScreen("main");
    expansion = false;
})
controlBar.style.backgroundColor = "rgb(" + colors[0] * CRF + ", " + colors[1] * CRF + ", " + colors[2] * CRF + ")";
function playAudio(idd) {
    currentId = parseInt(idd);
    audioPath = document.getElementById(idd).getAttribute("audio--src");

    let req = new XMLHttpRequest();
    req.open("GET", "music/" + document.getElementById(idd).innerText, true);
    req.responseType = "blob";
    req.send();


    req.onload = (event) => {
        let blob = new Blob([req.response], { type: "audio/mpeg" });
        let url = window.URL.createObjectURL(blob);

        audioPlayer.src = url;
        playButton.src = "static/images/pause_ico.png"
        playButton2.src = "static/images/pause_ico.png"
        if (!expansion) {
            controlBar.style.display = "grid";
        }
        audioPlayer.play();
        document.getElementById("mLabel").innerText = document.getElementById(idd).innerText;
        document.getElementById("mLabel2").innerText = document.getElementById(idd).innerText;
        jsmediatags.read(blob, {
            onSuccess: function (tag) {
                
                try {
                    const coverData = tag.tags.picture.data;
                    const format = tag.tags.picture.format;
                    let base64data = "";
                    for (i = 0; i < coverData.length; i++) {
                        base64data += String.fromCharCode(coverData[i]);
                    }

                    playerCover.src = "data:" + format + ";base64, " + window.btoa(base64data);
                } catch (error) {
                    console.error("Media file might not have a cover photo");
                    playerCover.src="static/images/album_art_ico.png"
                }

            },
            onError: function (error) {
                console.log(error);
            }
        });
    };

}
setInterval(() => {
    if (audioPlayer.paused) {
        playButton.src = "static/images/play_ico.png";
        playButton2.src = "static/images/play_ico.png";
    }
}, 2000);
function togglePlayer() {
    if (audioPlayer.paused && audioPlayer.currentTime > 0) {
        audioPlayer.play();
        playButton.src = "static/images/pause_ico.png";
        playButton2.src = "static/images/pause_ico.png";

    } else {
        audioPlayer.pause();
        playButton.src = "static/images/play_ico.png";
        playButton2.src = "static/images/play_ico.png";
    }
}

function nextSong() {
    if (currentId+1 <= maxId) {
        playAudio(currentId+1);
        playButton2.src = "static/images/pause_ico.png";
    }
}

function previousSong() {
    if (currentId-1 >= 0) {
        playAudio(currentId-1);
        playButton2.src = "static/images/pause_ico.png";
    }
}

