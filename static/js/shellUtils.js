let currentScreen = "main";

function startup() {
	
	checkAppLoad();

	setTimeout(()=>{
		main();
	}, 2000);
}

function checkAppLoad() {
	if (document.readyState === 'complete') {
		
		console.log("appFullyLoaded");
		parent.showAppViewer();
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
	}, 400)
}

function openDialogue(dId) {
	document.getElementById(dId).style.display = "block";
	document.getElementById(currentScreen).style.filter = ("blur(12px)")
}

function closeDialogue(dId) {
	document.getElementById(dId).style.display = "none";
	document.getElementById(currentScreen).style.filter = ("blur(0)")
}

function main() {
	document.getElementById("main").style.display = "block";
}

window.onload = startup;
