var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var btBw = document.getElementById("bw");
var btNegative = document.getElementById("negative");
var btOrigin = document.getElementById("origin");
var btSepia = document.getElementById("sepia");

var img = new Image();
var img2 = new Image();
img2.src = "test.jpg"; 

var fileReader = new FileReader();

canvas.addEventListener("dragenter", function(){
	this.style.border = "2px solid blue";
})

canvas.addEventListener("dragleave", function(){
	this.style.border = "none";
})

canvas.addEventListener("dragover", function(e){
	e.preventDefault();
	// e.stopProrpogation();
})

canvas.addEventListener("drop", function(e){
	e.preventDefault();
	var dT = e.dataTransfer; // отвечает за хранение данных, которые перетаскиваются с помощью drag'n'drop 
	// this.innerHTML = dT.getData("text");
	console.log(dT.files);
	fileReader.onload = function(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		img.src = this.result;
		img2.src = this.result;
	}

	fileReader.readAsDataURL(dT.files[0]);
	this.style.border = "none";
	
}) 

img.onload = function() { 
	context.drawImage(img, 0, 0);
	var event = new Event("click");
	for(var i = 0; i < document.getElementsByTagName("button").length; i++){
		if(document.getElementsByTagName("button")[i].classList.contains("press")){
			document.getElementsByTagName("button")[i].dispatchEvent(event);
		}
	}
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
		for(var i = 0; i < document.getElementsByTagName("button").length; i++){
			document.getElementsByTagName("button")[i].classList.remove("press");
		}
		this.classList.add("press");
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
	    for(var i = 0; i < document.getElementsByTagName("button").length; i++){
			document.getElementsByTagName("button")[i].classList.remove("press");
		}
		this.classList.add("press");
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
		for(var i = 0; i < document.getElementsByTagName("button").length; i++){
			document.getElementsByTagName("button")[i].classList.remove("press");
		}
		this.classList.add("press");
	})

	btOrigin.addEventListener("click", function(){
		context.drawImage(img2, 0, 0);
		dataImg = context.getImageData(0, 0, canvas.width, canvas.height);
		data = dataImg.data;
		for(var i = 0; i < document.getElementsByTagName("button").length; i++){
			document.getElementsByTagName("button")[i].classList.remove("press");
		}
		this.classList.add("press");
	})
}

img.src = 'test.jpg'; 
