var ul = document.getElementsByTagName("ul")[0];
var prevBt = document.getElementById("prev");
var nextBt = document.getElementById("next");
var btn = document.getElementsByClassName("btn")[0];
var curr = 1;
var arr = ["fon1.jpg", "fon2.jpg", "fon3.jpg", "fon4.jpg", "fon5.jpg"];
var bullet = document.getElementsByClassName("bullet")[0];

var boundingRect = document.getElementsByClassName("window")[0].getBoundingClientRect();

console.log(boundingRect);

ul.style.width = boundingRect.width*(arr.length+1) + "px";
btn.style.marginLeft = boundingRect.x + "px";
btn.style.marginTop = (boundingRect.height)*(-1) + "px";
btn.style.width = boundingRect.width + "px";
prevBt.style.height = boundingRect.height + "px";
prevBt.style.float = "left";
nextBt.style.height = boundingRect.height + "px";
nextBt.style.float = "right";
bullet.style.width = boundingRect.width + "px";
bullet.style.marginLeft = boundingRect.x + "px";

for(var i = 0; i < arr.length; i++){
	var li = document.createElement("li");
	var image = document.createElement("img");
	image.setAttribute("src", arr[i]);
	image.style.width = boundingRect.width + "px";
	image.style.height = boundingRect.height + "px";
	li.appendChild(image);
	li.setAttribute("value", i);
	ul.appendChild(li);

	var bulletBtn = document.createElement("input");
	bulletBtn.setAttribute("type", "radio");
	bulletBtn.setAttribute("name", "slider");
	bulletBtn.setAttribute("id", "slider"+i);
	bullet.appendChild(bulletBtn);
	var bulletLbl = document.createElement("label");
	bulletLbl.setAttribute("for", "slider"+i);
	bullet.appendChild(bulletLbl);
}

nextBt.addEventListener("click", function(){
	
	if(curr<arr.length){
		curr++;
		console.log(curr);
		open(curr);

	}
})

function open(curr1){
	// if(curr<=arr.length){
		ul.style.left="";
		ul.style.right = (curr1-1)*539 + "px";
	// }
	curr = curr1;
	
}

prevBt.addEventListener("click", function(){
	
	if(curr>1){
		 curr--;
		console.log(curr);
		open(curr);
	}
})

// function prevSlide(curr){
// 		ul.style.right="";
// 		ul.style.left = (curr-1)*539*(-1) + "px";
// }

bullet.addEventListener("change", function(e){
	// console.log(Number(e.target.getAttribute("id").slice(6, e.target.getAttribute("id").length)) + 1);
	open(Number(e.target.getAttribute("id").slice(6, e.target.getAttribute("id").length)) + 1);
})

