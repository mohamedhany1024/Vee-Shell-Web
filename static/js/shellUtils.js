let currentScreen = "main";
let bg = document.getElementsByClassName("background");
function startup() {
	
	checkAppLoad();

	setTimeout(()=>{
		main();
	}, 2000);
}

function checkAppLoad() {
	if (document.readyState === 'complete') {
		
		console.log("appFullyLoaded");
		parent.showAppViewer(parent.getCurrentAppID());
		let splashColor = parent.getAccentColor();
		splashColor[0]*=(17/20);
		splashColor[1]*=(17/20);
		splashColor[2]*=(17/20);
		document.getElementById("splashScreen").style.backgroundColor = "rgb("+splashColor[0]+", "+splashColor[1]+", "+splashColor[2]+")";
		if (localStorage.getItem("appBgType") == "accentGradient") {
			document.querySelector(".background").style.backgroundImage = `radial-gradient(circle at 10px 10px ,  rgb(${splashColor[0]*(4/2)}, ${splashColor[1]*(4/2)}, ${splashColor[2]*(4/2)}), rgb(${splashColor[0]*(4/10)}, ${splashColor[1]*(4/10)}, ${splashColor[2]*(4/10)}))`;
		}
		setTimeout(()=> {
			
			document.getElementById("splashScreen").classList.toggle("splashScreen--hide");

			setTimeout(()=> {
				document.getElementById("splashScreen").style.display = "none";
				
			}, 400);
		}, 2000);

		
	}
}

function openScreen(screen) {
	setTimeout(() => {
		var screens = document.getElementsByClassName("screen")
		var screenId = screen;
		currentScreen = screen;
		var screenIds;
		for (i = 0; i < screens.length; i++) {
			screenIds = screens[i].id;
			if (screenIds != screenId) {
				document.getElementById(screenIds).style.display = "none";
			}
		}
		document.getElementById(screenId).style.display = "block";
	}, 100)
}

function openDialogue(dId) {
	document.getElementById(dId).style.display = "block";
	document.getElementById(currentScreen).style.filter = ("blur(13px)");
	document.getElementById(currentScreen).style.filter += ("brightness(80%)");
	
	bg[0].style.filter = ("brightness(50%) blur(13px)");
}

function closeDialogue(dId) {
	document.getElementById(dId).style.display = "none";
	document.getElementById(currentScreen).style.filter = ("");
	bg[0].style.filter = ("blur(13px)");
}

function updateProperties(propertyObjects) {
	for(i = 0; i < propertyObjects.length; i++) {
		document.querySelector(':root').style.setProperty(propertyObjects[i].name, propertyObjects[i].value);
	}
}

function main() {
	document.getElementById("main").style.display = "block";
}

window.onload = startup;
