let audioPlayer = new Audio;
let audioPath = "";
let maxId = 0;
let currentId = 0;
let expansion = false;
const colorThief = new ColorThief();
const jsmediatags = window.jsmediatags;
$.get("/listMusic", (data) => {
    if (data.length < 1) {
        document.getElementById("main").innerHTML += "<p class='textBlock'>No audio files were found in your music folder.</p>";
    }
    for (i = 0; i < data.length; i++) {
        document.getElementById("main").innerHTML += "<p class=whiteText audioFile' onclick='playAudio(this.id)' id='" + i + "' audio--src='" + data[i][1] + "'>" + data[i][0] + "</p>";
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
let controlBg = document.getElementById("controlBg");
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
        let seekBar= document.getElementById("seekBar");
        let cTime = document.getElementById("currentTime");
        let tTime = document.getElementById("totalTime");
        let pastSeek = 0;
        let audioDuration
        audioPlayer.src = url;
        
        //tTime.innerText = audioPlayer.duration;
        seekBar.addEventListener("input", ()=> {
            audioPlayer.currentTime = (seekBar.value/100) * audioPlayer.duration;
        });

        setInterval(()=>{
            if (audioPlayer.readyState == 4) {
                audioDuration = parseInt(audioPlayer.duration);
                //console.log(audioDufration);
                tTime.innerText = `${Math.trunc(audioDuration/60)}:${Math.trunc(audioDuration) % 60}`;
        
            }
            seekBar.value = (audioPlayer.currentTime/audioPlayer.duration)*100;
            cTime.innerText = `${Math.trunc(audioPlayer.currentTime/60)}:${Math.trunc(audioPlayer.currentTime) % 60}`;
            //console.log((audioPlayer.currentTime/audioPlayer.duration)*100);
        }, 1000);
        playButton.src = "static/images/pause_ico.png"
        playButton2.src = "static/images/pause_ico_2.png"
        if (!expansion) {
            controlBar.style.display = "grid";
        }
        audioPlayer.play();
        document.getElementById("mLabel").innerText = document.getElementById(idd).innerText;
        document.getElementById("mLabel2").innerText = document.getElementById(idd).innerText;
        playerCover.src="static/images/album_art_ico.png";
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
                    /*let coverColor = colorThief.getColor(playerCover, 5);
                    controlBar.style.backgroundColor = `rgba(${coverColor[0]}, ${coverColor[1]}, ${coverColor[2]}, 1)`;*/
                    //console.log(playerCover.src);
                    //controlBg.src = playerCover.src;
                    //controlBg.style.backgroundImage = `url('${playerCover.src}')`;
                    //controlBar.style.backdropFilter = "blur(13px)";
                    //controlBar.style.objectFit="cover";
                } catch (error) {
                    console.error("Media file might not have a cover photo");
                    console.error(error);
                    playerCover.src="static/images/album_art_ico.png";
                    controlBar.style.backgroundColor = "rgb(" + colors[0] * CRF + ", " + colors[1] * CRF + ", " + colors[2] * CRF + ")";
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
        playButton2.src = "static/images/play_ico_2.png";
    }
}, 2000);
function togglePlayer() {
    if (audioPlayer.paused && audioPlayer.currentTime > 0) {
        audioPlayer.play();
        playButton.src = "static/images/pause_ico.png";
        playButton2.src = "static/images/pause_ico_2.png";

    } else {
        audioPlayer.pause();
        playButton.src = "static/images/play_ico.png";
        playButton2.src = "static/images/play_ico_2.png";
    }
}

function nextSong() {
    if (currentId+1 <= maxId) {
        playAudio(currentId+1);
        playButton2.src = "static/images/pause_ico_2.png";
    }
}

function previousSong() {
    if (currentId-1 >= 0) {
        playAudio(currentId-1);
        playButton2.src = "static/images/pause_ico_2.png";
    }
}

