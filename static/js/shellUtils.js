function startup() {
	checkAppLoad();
	main();
}

function checkAppLoad() {
	if (document.readyState === 'complete') {
		document.getElementById("splashScreen").style.display = "none";
		console.log("appFullyLoaded");
	}
}

function openScreen(screen) {
	var screens = document.getElementsByClassName("screen")
	var screenId = screen;
	var screenIds;
	for(i=0; i < screens.length; i++ ) {
		screenIds = screens[i].id;
		if(screenIds != screenId) {
			document.getElementById(screenIds).style.display = "none";
		}
	}
	document.getElementById(screenId).style.display = "block";
}

function main() {
	document.getElementById("main").style.display = "block";
}

window.onload = startup;
