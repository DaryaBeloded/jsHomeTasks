var mainDiv = document.getElementById("main");
var xhr = new XMLHttpRequest();
xhr.open("GET", "goods.json", true);
xhr.onload = function(){
	var k = 0;
	var data = JSON.parse(this.responseText);
	console.log(data);
	var addElem2 = function(n){
		var div = document.createElement("div");
				var img = document.createElement("img");
				img.style.height = "700px";
				img.setAttribute("src", data[n].path);
				div.appendChild(img);
				mainDiv.appendChild(div);
	}
	var addElem = function(){
		console.log(k);
		if(k < data.length - 2){
			var s = k;
			for(var i = k; i < (s + 2); i++, k++){
				addElem2(i);
			}
		}
		else{
			for(var i = k; i < data.length; i++, k++){
				addElem2(i);
			}
			k = 0;
			for(var i = k; i < k+1 ; i++){
				addElem2(i);
			}
			k++;
		}
	}
	addElem();

	window.addEventListener("scroll", function(){
		if(mainDiv.lastChild.getBoundingClientRect().bottom < window.innerHeight){
			addElem();
		}
	})
}
xhr.send();