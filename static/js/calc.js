var num1;
var num2;
var numIndex = 0;
var result;
var opera;
var resultDisplay = document.getElementById("result");

function number(idd) {
	var disp2 = document.getElementById("num2");
	if (numIndex == 1) {
		disp2.innerHTML = disp2.innerHTML + idd;
		num2 = Number(disp2.innerHTML);
		console.log(num2);
	} 
	
	var disp = document.getElementById("num1");
	
	if (numIndex == 0) {
		disp.innerHTML = disp.innerHTML + idd;
		num1 = Number(disp.innerHTML);
		console.log(num1);
	}
}
	
function operator(iddd) {
	if (iddd == "+") {
		opera = "+"
		console.log(op);
	}
	
	if (iddd == "-") {
		opera = "-"
	}
	
	if (iddd == "*") {
		opera = "*"
	}
	
	if (iddd == "/") {
			opera = "/"
	}
	
	var op = document.getElementById("operator");
	op.innerHTML = op.innerHTML + iddd;
	numIndex +=1;
}

function getResult() {
	if (opera == "+") {
		result = num1 += num2;
		resultDisplay.innerHTML = result;
	}
	
	if (opera == "-") {
		result = num1 -= num2;
		resultDisplay.innerHTML = result;
	}
	
	if (opera == "*") {
		result = num1 * num2;
		resultDisplay.innerHTML = result;
	}
	
	if (opera == "/") {
		result = num1 /= num2;
		resultDisplay.innerHTML = result;
	}
	console.log("function executed");
}

function clear() {
		window.location.href = "../calc.html";
		console.log("cLEARRRR");
}
