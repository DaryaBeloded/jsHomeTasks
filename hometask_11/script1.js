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
		if(elem.title == "female"){
			content.classList.add("female");
		}
		if(elem.title == "male"){
			content.classList.add("male");
		}
		content.style.display="none";
		content.style.position = "absolute";
		elem.categories.forEach(function(item){
			var div = document.createElement("div");
			div.innerHTML = "<p>" + item.name + "</p><ul class = 'ul1'></ul>";
			var ul1 = div.children[1];
			item.items.forEach(function(elem1){
				var li = document.createElement("li");
				li.innerText = elem1.itemName;
				ul1.appendChild(li);
			})
			content.appendChild(div);
		}) 
		contentDiv.appendChild(content);
	})

	//--------------STYLE----------------------------
	document.getElementsByClassName("female")[0].children[0].style.float = "left";
	document.getElementsByClassName("female")[0].children[1].style.float = "right";
	document.getElementsByClassName("female")[0].children[1].style.marginLeft = "74px";

	document.getElementsByClassName("male")[0].children[0].style.float = "left";
	document.getElementsByClassName("male")[0].children[1].style.float = "right";
	document.getElementsByClassName("male")[0].children[1].style.marginLeft = "74px";
	//-----------------------------------------------

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
	contentDiv.addEventListener("click", function(e){
		if(e.target.parentNode.getAttribute("class") == "ul1"){
				for(var i = 0; i < data.length; i++){
					for(var k = 0; k < data[i].categories.length; k++){
						for(var k1 = 0; k1 < data[i].categories[k].items.length; k1++){
							if(data[i].categories[k].items[k1].itemName == e.target.outerText){
								contentDiv1.innerHTML = data[i].categories[k].items[k1].img;
							}
						}
					}
				}
		}
	})
}
xhr.send();