var bt = fw.create("button");
bt.setAttribute("type", "button");
var div = fw.Get.ByTagName("div", 0);
fw.append(div, bt);
console.log(fw.width(bt));
console.log(fw.height(bt));
fw.css(bt,"background","red");

var ul = document.getElementsByTagName("ul")[0];
var i = 0;
for(; i < 4; i++){
	var li = document.createElement("li");
	li.innerText = i+1;
	ul.appendChild(li);
}
ul.addEventListener("click", function(e){
	if(e.target!=this){
		if(e.target.parentNode.parentNode.parentNode.parentNode.parentNode==this){return;}
			else{
			if(e.target.children.length == 1){
				// e.target.children[0].style.display = "none";
				e.target.children[0].remove();
			}
			else{
				var anotherUl = document.createElement("ul");
				// anotherUl.style.display = "block";
				e.target.appendChild(anotherUl);
				console.log(e);
				for(var j=i; j < i+4; j++){
					var anotherLi = document.createElement("li");
					anotherLi.innerText = j+1;
					anotherUl.appendChild(anotherLi);
				}
				i+=4;
			}
		}
	}
})
