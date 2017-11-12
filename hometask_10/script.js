var div = document.getElementById("main");
var settings = {
	"#imgbt": {
		path: "imgbt.html",
		handler: function(){
			var bt = document.getElementsByTagName("button")[0];
			bt.addEventListener("click", function(){
				var img = document.createElement("img");
				img.setAttribute("src", "1.jpg");
				div.appendChild(img);
			})
		}
	},
	"#image": {
		path: "image.html",
		handler: function(){}
	},
			
	"#music": {
		path: "music.html",
		handler: function(){}
	},
	"#inp+alert": {
		path: "inp+alert.html",
		handler: function(){
			var bt = document.getElementsByTagName("button")[0];
			bt.addEventListener("click", function(){
				var inp = document.getElementsByTagName("input")[0];
				alert(inp.value);
			})
		}
	},
	"#text": {
		path: "text.html",
		handler: function(){}
	}
}
var change = function(){
	var path = settings[location.hash].path; //location.hash -текущий hash в адресной строке
	var callback = settings[location.hash].handler;
	// var xhr = new XMLHttpRequest();
	// xhr.open("GET", path, true); //true - для ассинхронного выполнения (AJAXa)
	// xhr.onload = function(){
	// 	div.innerHTML = this.responseText;
	// 	callback();
	// }
	// xhr.send();
	fw.ajax("GET", path, function(){
		div.innerHTML = this.responseText;
		callback();
	})
}
window.onhashchange = function(){
	change();
}

if(location.hash in settings){ 
	change();
}