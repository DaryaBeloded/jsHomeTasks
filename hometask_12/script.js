var div = document.getElementsByClassName("main")[0];
div.contentEditable = true;
div.focus();

var divBt = document.getElementsByClassName("wordBt")[0];

divBt.innerHTML += "<button type='button' id='bold'>ж</button>";
divBt.innerHTML += "<button type='button' id='underline'><u>A</u></button>";
divBt.innerHTML += "<button type='button' id='cursiv'><i>cur</i></button>";
divBt.innerHTML += "<button type='button' id='numericList'>NL</button>";
divBt.innerHTML += "<button type='button' id='markerList'>ML</button>";
divBt.innerHTML += "<button type='button' id='hr'>-hr-</button><br>";
divBt.innerHTML += "<select id='size'></select><select id='family'></select><br>";
divBt.innerHTML += "text-color<input type='color' id='color_picker_font'>";
divBt.innerHTML += "bg-color<input type='color' id='color_picker_back'><br>";
divBt.innerHTML += "<button type='button' id='center'>center</button><button type='button' id='left'>left</button><button type='button' id='right'>right</button>";
divBt.innerHTML += "<button type='button' id='indent'>|-></button><button type='button' id='outdent'><-|</button>";
divBt.innerHTML += "<input type='text' id='inpHref' placeholder='enter the link...'><button type='button' id='btHref'>add</button>";
divBt.innerHTML += "<button type='button' id='clear'>clear</button>";

var arr = ["bold","underline", "cursiv", "numericList", "markerList", "hr","center", "right", "left", "indent", "outdent"]

var selectSize = document.getElementById("size");
selectSize.innerHTML = "<option disabled selected hidden>font-size...</option>";
for(var i = 1; i < 8; i++){
	var opt = document.createElement("option");
	opt.innerText = i;
	selectSize.appendChild(opt);
}

var selectFamily = document.getElementById("family");
selectFamily.innerHTML = "<option disabled selected hidden>font-family...</option>";
var arrFamily = ["Arial", "Verdana", "Times New Roman", "Georgia", "Trebuchet MS", "Sans", "Comic San MS", "Courier New", "Garamond", "Helvetica"];
arrFamily.forEach(function(elem){
	var opt = document.createElement("option");
	opt.innerText = elem;
	opt.style.fontFamily = elem;
	selectFamily.appendChild(opt);
})

document.getElementById("bold").addEventListener("click", function(){
	document.execCommand("bold", false, null);
	this.classList.toggle("press");
	div.focus();
})

document.getElementById("underline").addEventListener("click", function(){
	document.execCommand("underline", false, null);
	this.classList.toggle("press");
	div.focus();
})

document.getElementById("cursiv").addEventListener("click", function(){
	document.execCommand("italic", false, null);
	this.classList.toggle("press");
	div.focus();
})

document.getElementById("numericList").addEventListener("click", function(){
	document.execCommand("insertorderedlist", false, null);
	this.classList.toggle("press");
	div.focus();
})

document.getElementById("markerList").addEventListener("click", function(){
	document.execCommand("insertunorderedlist", false, null);
	this.classList.toggle("press");
	div.focus();
})

document.getElementById("hr").addEventListener("click", function(){
	document.execCommand("inserthorizontalrule", false, null);
	this.classList.toggle("press");
	div.focus();
})

selectSize.addEventListener("change", function(){
	document.execCommand("fontsize", false, this.value);
	div.focus();
})

selectFamily.addEventListener("change", function(){
	document.execCommand("fontname", false, this.value);
	div.focus();
})

document.getElementById("color_picker_font").addEventListener("change", function(){
	document.execCommand("forecolor", false, this.value);
	div.focus();
})

document.getElementById("color_picker_back").addEventListener("change", function(){
	document.execCommand("backcolor", false, this.value);
	div.focus();
})

document.getElementById("center").addEventListener("click", function(){
	if(this.classList.contains("press")){
		document.execCommand("justifyleft", false, null);
	}
	else
		document.execCommand("justifycenter", false, null);
	this.classList.toggle("press");
	div.focus();
})

document.getElementById("right").addEventListener("click", function(){
	if(this.classList.contains("press")){
		document.execCommand("justifyleft", false, null);
	}
	else
		document.execCommand("justifyright", false, null);
	this.classList.toggle("press");
	div.focus();
})

document.getElementById("left").addEventListener("click", function(){
	document.execCommand("justifyleft", false, null);
	this.classList.toggle("press");
	div.focus();
})

document.getElementById("indent").addEventListener("click", function(){
	document.execCommand("indent", false, null);
	div.focus();
})

document.getElementById("outdent").addEventListener("click", function(){
	document.execCommand("outdent", false, null);
	div.focus();
})

document.getElementById("btHref").addEventListener("click", function(){
	document.execCommand("createlink", false, document.getElementById("inpHref").value);
	div.focus();
})

document.getElementById("clear").addEventListener("click", function(){
	document.execCommand("removeformat", false, document.getElementById("inpHref").value);

	arr.forEach(function(elem){
		if(document.getElementById(elem).getAttribute("class") == "press"){
			document.getElementById(elem).classList.remove("press");
		}
	})

	div.focus();
})

// var arr = [];

// div.addEventListener("mouseover", function(e){

// 	if(document.getSelection().toString()){
// 		// for(var i = div.outerText.indexOf(document.getSelection().toString()); i < div.outerText.indexOf(document.getSelection().toString()) + document.getSelection().toString().length; i++){
// 			if(document.queryCommandState("bold")) arr.push("bold");
// 				console.log(document.queryCommandValue("forecolor"));
// 		// }
		
// 	}
// 	// else {
// 	// 	e.preventDefault();
// 	// }
// })





