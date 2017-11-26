var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var context = canvas.getContext("2d");
window.x1 = 0;
window.y1 = 0;	

var draw = function(e){
	context.beginPath();
	x = x1;
	y = y1;
	context.moveTo(x, y);
	context.lineTo(e.clientX, e.clientY);
	context.stroke();
	x1 = e.clientX;
	y1 = e.clientY;
}

canvas.addEventListener("mousedown", function(e){
	x1 = e.clientX;
	y1 = e.clientY;
	canvas.addEventListener("mousemove", draw);
})

canvas.addEventListener("mouseup", function(e){
	canvas.removeEventListener("mousemove", draw);
})