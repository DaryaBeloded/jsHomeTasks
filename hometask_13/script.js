var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var btBw = document.getElementById("bw");
var btNegative = document.getElementById("negative");
var btOrigin = document.getElementById("origin");
var btSepia = document.getElementById("sepia");

var img = new Image();
var img2 = new Image();
img2.src = "test.jpg";  

img.onload = function() { 
	context.drawImage(img, 0, 0);
	var dataImg = context.getImageData(0, 0, canvas.width, canvas.height);
	var data = dataImg.data;

	btBw.addEventListener("click", function(){
		context.drawImage(img2, 0, 0);
		dataImg = context.getImageData(0, 0, canvas.width, canvas.height);
		data = dataImg.data;
		for (var i = 0; i < data.length; i += 4) {
	      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
	      data[i]     = avg; // red
	      data[i + 1] = avg; // green
	      data[i + 2] = avg; // blue
	  	}
		context.putImageData(dataImg, 0, 0);
	})

	btNegative.addEventListener("click", function(){
		context.drawImage(img2, 0, 0);
		dataImg = context.getImageData(0, 0, canvas.width, canvas.height);
		data = dataImg.data;
		for (var i = 0; i < data.length; i += 4) {
	      data[i]     = 255 - data[i];     // red
	      data[i + 1] = 255 - data[i + 1]; // green
	      data[i + 2] = 255 - data[i + 2]; // blue
	    }
	    context.putImageData(dataImg, 0, 0);
	})

	btSepia.addEventListener("click", function(){
		context.drawImage(img2, 0, 0);
		dataImg = context.getImageData(0, 0, canvas.width, canvas.height);
		data = dataImg.data;
		for (var i = 0; i < data.length; i += 4) {
			var r = data[i];
			var g = data[i + 1];
			var b = data[i + 2];
			data[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
			data[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
			data[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
		}
		context.putImageData(dataImg, 0, 0);
	})

	btOrigin.addEventListener("click", function(){
		context.drawImage(img2, 0, 0);
		dataImg = context.getImageData(0, 0, canvas.width, canvas.height);
		data = dataImg.data;
	})
}

img.src = 'test.jpg'; 

var canvas1 = document.getElementById("canvas1");
var ctx = canvas1.getContext("2d");
var filter = noneFilter;
function noneFilter(){
    ctx.filter = "none";
    ctx.drawImage(video, 0, 0, 500, 250);
}
function invertFilter(){
    ctx.filter = "invert(100%)";
    ctx.drawImage(video, 0, 0, 500, 250);
}
function sepiaFilter(){
    ctx.filter = "sepia(100%)";
    ctx.drawImage(video, 0, 0, 500, 250);
}
function draw(){
    filter();
    requestAnimationFrame(draw);
}
draw();
