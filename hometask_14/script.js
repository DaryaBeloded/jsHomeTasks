var xhr = new XMLHttpRequest();
xhr.open("GET", "playlist.json", true);
xhr.onload = function(){

var data = JSON.parse(this.responseText);


var audio1 = document.getElementById("song1");
audio1.src = data[0].path;
// console.log(audio1)
var mainDiv = document.getElementsByClassName("main")[0];
var visualDiv = document.getElementsByClassName("visual")[0];

var playlistDiv = document.getElementsByClassName("playList")[0];



visualDiv.innerHTML += "<div id='fullSong'></div><div id='current'></div><div id='subDiv'></div>";
visualDiv.innerHTML += "<div id='time' ></div>";
mainDiv.innerHTML += "<button type='button' id='play_pause'><span class='glyphicon glyphicon-play'></span></button>"; 
mainDiv.innerHTML += "<button type='button' id='stop'><span class='glyphicon glyphicon-stop'></span></button>";
mainDiv.innerHTML += "<input id='volume' type='range' min='0' max='100' step='1' value='50' style='width: 150px'>";
mainDiv.innerHTML += "<button type='button' id='slower'><span class='glyphicon glyphicon-fast-backward'></span></button>";
mainDiv.innerHTML += "<button type='button' id='faster'><span class='glyphicon glyphicon-fast-forward'></span></button>";
mainDiv.innerHTML += "<button type='button' id='infinity'><span class='glyphicon glyphicon-repeat'></span></button><br>";


data.forEach(function(elem){
	playlistDiv.innerHTML += "<div style='margin-bottom: 10px'><img src = '" + elem.cover +"'>"+ elem.title + "<button tupe='button' class='sendPlay'><span class='glyphicon glyphicon-play'></span></button></div>";	
})

var prevPress;
var prevCurrTime;

for(var k = 0; k < data.length; k++){
	(function(i){
		document.getElementsByClassName("sendPlay")[i].addEventListener("click", function(e){

				for(var n = 0; n < data.length; n++){
					var bt = document.getElementsByClassName("sendPlay")[n];

					bt.parentNode.style.background = "";
					if(n!=i)
						bt.children[0].setAttribute("class","glyphicon glyphicon-play" );

				}
		
			if(this.children[0].getAttribute("class") == "glyphicon glyphicon-play"){

			audio1.src = data[i].path;
			this.children[0].setAttribute("class", "glyphicon glyphicon-pause");
			this.parentNode.style.background = "#eee";
			if(e.target == prevPress){
					console.log(prevCurrTime);
					console.log();
					audio1.currentTime = prevCurrTime;
			}
			else{audio1.currentTime = 0}

				prevPress = e.target;
			}
			else{ 
				this.children[0].setAttribute("class", "glyphicon glyphicon-play");
				prevCurrTime = audio1.currentTime;
				this.parentNode.style.background = "";

			}
			var event = new Event("click");
			document.getElementById("play_pause").dispatchEvent(event);

		
		})
	})(k)
}

// audio1.addEventListener("loadedmetadata", function(){



document.getElementById("time").innerText = "00:00" + " / 05:18"; 


document.getElementById("play_pause").addEventListener("click", function(){
	if(this.children[0].getAttribute("class") == "glyphicon glyphicon-play"){
		this.children[0].setAttribute("class", "glyphicon glyphicon-pause"); 
		for(var i = 0; i < data.length; i++){
			if("http://localhost/hometask_14/" + data[i].path == audio1.src){
					document.getElementsByClassName("sendPlay")[i].children[0].setAttribute("class", "glyphicon glyphicon-pause");

					document.getElementsByClassName("sendPlay")[i].parentNode.style.background = "#eee";
			}
		}
		
		for(var i =0 ; i < data.length; i++){
			if(data[i].src == audio1.src){
							var event = new Event("click");

				document.getElementsByClassName("sendPlay")[i].dispatchEvent(event);
			}
		}
		audio1.play();
		setInterval(function() { 
			document.getElementById("current").style.width = ((audio1.currentTime / audio1.duration) * document.getElementById("fullSong").getBoundingClientRect().width) + "px"; 
			
			var currMin = Math.floor(audio1.currentTime/60);
			var currSec = Math.floor(audio1.currentTime%60);
			var fullSec = Math.round(audio1.duration%60);
			if(fullSec < 10) fullSec = "0" + Math.round(audio1.duration%60)
			if(currMin > 10 && currSec < 10) document.getElementById("time").innerText = currMin + ":0" + currSec + " / 0" + Math.round(audio1.duration/60) + ":" + fullSec; 
			else if(currMin > 10 && cerrSec > 10) document.getElementById("time").innerText = currMin + ":" + currSec + " / 0" + Math.round(audio1.duration/60) + ":" + fullSec; 
				else if(currMin < 10 && currSec > 10)  document.getElementById("time").innerText = "0" + currMin + ":" + currSec + " / 0" + Math.round(audio1.duration/60) + ":" + fullSec;
					else if(currMin < 10 && currSec < 10) document.getElementById("time").innerText = "0" + currMin + ":0" + currSec + " / 0" + Math.round(audio1.duration/60) + ":" + fullSec;
			
		}, 1000);
	}
	else if(this.children[0].getAttribute("class") == "glyphicon glyphicon-pause"){
		this.children[0].setAttribute("class", "glyphicon glyphicon-play");

		for(var i = 0; i < data.length; i++){
			if("http://localhost/hometask_14/" + data[i].path == audio1.src){
					document.getElementsByClassName("sendPlay")[i].children[0].setAttribute("class", "glyphicon glyphicon-play");
					document.getElementsByClassName("sendPlay")[i].parentNode.style.background = "";
			}
		}
		audio1.pause();
	}
})

document.getElementById("stop").addEventListener("click", function(){
	audio1.pause();
	audio1.currentTime = 0;
	document.getElementById("play_pause").children[0].setAttribute("class", "glyphicon glyphicon-play");
	for(var i = 0; i < data.length; i++){
			if("http://localhost/hometask_14/" + data[i].path == audio1.src){
					document.getElementsByClassName("sendPlay")[i].children[0].setAttribute("class", "glyphicon glyphicon-play");

					// document.getElementsByClassName("sendPlay")[i].parentNode.style.background = "#eee";
			}
		}
})

document.getElementById("slower").addEventListener("click", function(){
	audio1.playbackRate *= 0.8;
})

document.getElementById("faster").addEventListener("click", function(){
	audio1.playbackRate *= 1.25;
})

document.getElementById("infinity").addEventListener("click", function(){
		// audio1.loop=!audio1.loop;
		if(audio1.loop) {
			audio1.loop = false;
			this.style.border = "1px solid black";

		}
		else if(!audio1.loop){
			audio1.loop = true;
			this.style.border = "3px solid #a2b5";
		}
})

audio1.addEventListener("pause", function(){
	document.getElementById("play_pause").children[0].setAttribute("class", "glyphicon glyphicon-play");				
})

document.getElementById("volume").addEventListener("change", function(){
	audio1.volume = this.value / 100;
})

document.getElementById("subDiv").addEventListener("click", function(e){
	document.getElementById("current").style.width = e.clientX - 30 + "px"; 
	audio1.currentTime = document.getElementById("current").getBoundingClientRect().width / document.getElementById("fullSong").getBoundingClientRect().width * audio1.duration;
})
// })




}
xhr.send();