var btClear = document.getElementById("clear");
var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var context = canvas.getContext("2d");
window.x1 = 0;
window.y1 = 0;	

window.onload = function(){
	if(localStorage.draw){
		var arr = localStorage.draw.split(/\s{1,}/);
		for(var i = 0; i < arr.length; i+=4){
			context.moveTo(arr[i], arr[i+1]);
			context.lineTo(arr[i+2], arr[i+3]);
			context.stroke();
		}
	}
}

var draw = function(e){
	context.beginPath();
	x = x1;
	y = y1;
	context.moveTo(x, y);
	context.lineTo(e.clientX, e.clientY);
	context.stroke();
	x1 = e.clientX;
	y1 = e.clientY;
	localStorage.draw += x + " " + y + " " +" "+x1+" " +y1+" ";
}

canvas.addEventListener("mousedown", function(e){
	x1 = e.clientX;
	y1 = e.clientY;
	canvas.addEventListener("mousemove", draw);
})

canvas.addEventListener("mouseup", function(e){
	canvas.removeEventListener("mousemove", draw);
})

btClear.addEventListener("click", function(){
		localStorage.draw = "";
		alert("local storage draw is clear!")
})