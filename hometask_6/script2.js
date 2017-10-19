var name1 = document.getElementsByTagName("input")[0];
var phone = document.getElementsByTagName("input")[1];
var email = document.getElementsByTagName("input")[2];
var site = document.getElementsByTagName("input")[3];
var age= document.getElementsByTagName("input")[4];
var div = document.getElementsByClassName("message")[0];
var btn = document.getElementsByTagName("button")[0];
var form1 = document.getElementsByTagName("form")[0];

name1.addEventListener("input", function(){
	this.addEventListener("blur", function(){
		if((/^[A-Za-z\- ]{3,20}$/).test(this.value)){
			this.className = "true";
			div.children[0].innerText = "";
		}
		else {
			this.className = "false";
			div.children[0].innerText = "Имя должно состоять из символов, дефиса или пробела!";
			this.focus();
		}

	})
})

phone.addEventListener("input", function(){
	this.addEventListener("blur", function(){
		if((/\+375 ?[ \(]?(24|25|29|33|44)[ \)]? ?[1-9]{3}[\- ]?[0-9]{2}[\- ]?[0-9]{2}/).test(this.value)){
			this.className = "true";
			div.children[0].innerText = "";
		}
		else {
			this.className = "false";
			div.children[0].innerText = "Шаблон телефона +375 (..) ...-..-..";
			this.focus();
		}

	})
})

email.addEventListener("input", function(){
	this.addEventListener("blur", function(){
		if((/[a-zA-z\_0-9\-]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,10}/).test(this.value)){
			this.className = "true";
			div.children[0].innerText = "";
		}
		else {
			this.className = "false";
			div.children[0].innerText = "не правильный email";
			this.focus();
		}

	})
})

site.addEventListener("input", function(){
	this.addEventListener("blur", function(){
		if((/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/).test(this.value)){
			this.className = "true";
			div.children[0].innerText = "";
		}
		else {
			this.className = "false";
			div.children[0].innerText = "не правильный адрес сайта ";
			this.focus();
		}

	})
})

age.addEventListener("input", function(){
	this.addEventListener("blur", function(){
		if(this.value >= 14 && this.value <= 90){
			this.className = "true";
			div.children[0].innerText = "";
		}
		else {
			this.className = "false";
			div.children[0].innerText = "возраст от 14 до 90";
			this.focus();
		}

	})
})

btn.addEventListener("click", function(){
	if(name1.getAttribute("class")!="true" || phone.getAttribute("class")!="true" || email.getAttribute("class")!="true" || site.getAttribute("class")!="true" || age.getAttribute("class")!="true"){
		for(var i = 0; i < document.getElementsByTagName("input").length; i++){
				if(document.getElementsByTagName("input")[i].getAttribute("class")=="true"){
					continue;
				}
				else {
					while(document.getElementsByTagName("input")[i].getAttribute("class")=="true"){
						document.getElementsByTagName("input")[i].focus();
					}
				}
		}
		
	}
	else {
		// this.addEventListener("submit", function(){
		alert("отправил!");
		// return false;
		// })
	}	
	
})

