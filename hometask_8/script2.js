var divMain = document.getElementsByTagName("div")[0];
var obj = [
	{
		title: "Dasha",
		action: function(){
			alert("Hi,Dasha");
		}
	},
	{
		title: "Roma",
		action: function(){
			alert("Hi,Roma");
		}
	},
	{
		title: "Vika",
		action: function(){
			alert("Hi,Vika");
		}
	}
]
var contextDiv = document.createElement("div");
contextDiv.setAttribute("class","context");
for(var i = 0; i < obj.length; i++){
	var divTitle = document.createElement("div");
	divTitle.innerHTML = "<p>" + obj[i].title + "</p>"; 
	contextDiv.appendChild(divTitle);
}
// console.log(contextDiv);
divMain.style.height = "645px";
divMain.addEventListener("contextmenu", function(e){
	e.preventDefault();
	contextDiv.style.position = "absolute";
	contextDiv.style.left = (document.documentElement.clientWidth > e.offsetX + 10 + 145) ? e.offsetX + 10 + "px" : e.offsetX -145 + "px" ;
	contextDiv.style.top = (document.documentElement.clientHeight > e.offsetY + 10 + 156) ? e.offsetY + 10 + "px" : e.offsetY -156 + "px" ;
	this.appendChild(contextDiv);

	// console.log(e);
	// console.log("ha");
})
contextDiv.addEventListener("click", function(e){
	// console.log(e.target);
	obj.forEach(function(elem){
		if(elem.title == e.target.outerText){
			elem.action();
		}
	})
})
divMain.addEventListener("click", function(){
	contextDiv.remove();
})
