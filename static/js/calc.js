var num1;
var num2;
var numIndex = 0;
var result;
var opera;
var resultDisplay = document.getElementById("result");
var disp = document.getElementById("expression");
function number(idd) {
	
	disp.innerText+=idd;
}
	
function operator(iddd) {
	disp.innerText+=iddd;
}

function getResult() {
	document.getElementById("result").innerText = "= " + eval(disp.innerText);
	
}

function clearDisp() {
		disp.innerText = "";
		document.getElementById("result").innerText = "";
		
}
