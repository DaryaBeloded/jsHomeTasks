var mainDiv = document.getElementById("main");
var contentDiv = document.getElementById("content");
var contentDiv1 = document.getElementById("content1");

var xhr = new XMLHttpRequest();
xhr.open("GET", "goods1.json", true);
xhr.onload = function(){
	mainDiv.innerHTML = "<ul><li id='female'>female</li><li id='male'>male</li></ul>";
	var data = JSON.parse(this.responseText);
	var female = document.getElementById("female");
	var male = document.getElementById("male");
	data.forEach(function(elem){
		var content = document.createElement("div");

		content.style.display="none";
		content.style.position = "absolute";
		
		var xhr1 = new XMLHttpRequest();
		xhr1.open("GET", elem.categories, true);
		xhr1.onload = function(){
			var data1 = JSON.parse(this.responseText);			
			for(var i = 0; i < data1.length; i++){				
				(function(n){
					var xhr2 = new XMLHttpRequest();
					xhr2.open("GET", data1[n].items, true);

					var div = document.createElement("div");
					div.innerHTML = "<p>" + data1[i].name + "</p><ul class = 'ul1'></ul>";
					var ul1 = div.children[1];

					xhr2.onload = function(){
						var data2 = JSON.parse(this.responseText);
						for(var k = 0; k < data2.length; k++){
							var li = document.createElement("li");
							li.innerText = data2[k].itemName;
							ul1.appendChild(li);
							(function(n){
							li.addEventListener("click", function(e){
								contentDiv1.innerHTML = data2[n].img;
							})
						})(k)
						}
					}
					xhr2.send();
					content.appendChild(div);
				})(i)
			}
			if(elem.title == "female"){
				content.classList.add("female");
				document.getElementsByClassName("female")[0].children[0].style.float = "left";
				document.getElementsByClassName("female")[0].children[1].style.float = "right";
				document.getElementsByClassName("female")[0].children[1].style.marginLeft = "74px";
			}
			if(elem.title == "male"){
				content.classList.add("male");
				document.getElementsByClassName("male")[0].children[0].style.float = "left";
				document.getElementsByClassName("male")[0].children[1].style.float = "right";
				document.getElementsByClassName("male")[0].children[1].style.marginLeft = "74px";
			}
		}
		xhr1.send();
		contentDiv.appendChild(content);

	female.addEventListener("click", function(){
		contentDiv1.innerHTML = "";
		for(var i = 0; i < contentDiv.children.length; i++){
				contentDiv.children[i].style.display = "none";
		}
		document.getElementsByClassName("female")[0].style.display = "block";
	})
	male.addEventListener("click", function(){
		contentDiv1.innerHTML = "";
		for(var i = 0; i < contentDiv.children.length; i++){
				contentDiv.children[i].style.display = "none";
		}
		document.getElementsByClassName("male")[0].style.display = "block";
	})
})
}
xhr.send();