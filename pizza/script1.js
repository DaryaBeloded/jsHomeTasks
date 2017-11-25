var contentDiv = document.getElementsByClassName("content")[0];
var count = 0;
var divPage = document.getElementsByClassName("pages")[0];
var ulPages = divPage.children[0];
var settings = {};
var arrPurchase = [];
var arr = [];
var numberOfPizza = 0;
var totalPrice = 0;

var cartDiv = document.getElementsByClassName("divcart")[0];
cartDiv.children[0].innerHTML = "количество пицц: " + numberOfPizza + "; общая стоимость: " + totalPrice;

var totalCart = cartDiv.children[2];
var cartCart = cartDiv.children[1];
cartCart.style.marginTop = "15px";

var divAdditive = document.getElementById("additive");
var windowDiv = document.getElementsByClassName("window")[0];

var xhr = new XMLHttpRequest();
xhr.open("GET", "pizza.json", true);
xhr.onload = function(){

	var data = JSON.parse(this.responseText);	
		var count = 0;
		for(var k = 0, count1 = 1; k < data.length; k+= 6, count1++){
			var pageDiv = document.createElement("div");
			contentDiv.appendChild(pageDiv);
			pageDiv.setAttribute("id", count1);
			pageDiv.classList.add("content1");
			pageDiv.style.display = "none";

			for(var i = k; i < k + 6 && i < data.length; i++){
				var div = document.createElement("div");
				div.classList.add("pizza");		

				var divImg = document.createElement("div");
				divImg.classList.add("pizzaImg");
				divImg.innerHTML = "<img src='images/" + data[i].img + "'>";

				var divDiscr = document.createElement("div");
				divDiscr.classList.add("pizzaDiscr");
				divDiscr.innerHTML = "<div class='title'><h1>" + data[i].title + "</h1></div>\n";
				divDiscr.innerHTML += "<div class='desc'><p>" + data[i].discription + "</p></div>\n";
				divDiscr.innerHTML += "<ul class='size'></ul>";
				
				div.appendChild(divImg);
				div.appendChild(divDiscr);
				pageDiv.appendChild(div);

				var ulSize = document.getElementsByClassName("size")[count];
				for(var key in data[i].size){
						var li = document.createElement("li");
						var label = document.createElement("label");
						label.innerText = data[i].size[key].title;
						var inp = document.createElement("input");
						inp.style.float = "left";
						inp.setAttribute("type", "radio");
						inp.setAttribute("class", key);
						inp.setAttribute("name", "size" + count+1);
						if(key == "priceBigSize") inp.setAttribute("checked", "checked");						

					label.appendChild(inp);
					li.appendChild(label);
					ulSize.appendChild(li);			
				}
				divDiscr.innerHTML += "<div class='price'><h2></h2><button type='button' class='cart'>В корзину</button></div>";

				(function(n){
					var priceH2 = document.getElementsByTagName("h2")[count];
					priceH2.innerHTML = data[n].size["priceBigSize"].price.toFixed(2) + "<br><b>" + data[n].size["priceBigSize"].dimention +"</b>";

					for(var key in data[n].size){
						document.getElementsByClassName(key)[count].addEventListener("change", function(){
							for(var k = 0; k < this.parentNode.parentNode.parentNode.children.length; k++){
								if(this.parentNode.parentNode.parentNode.children[k].children[0].children[0].hasAttribute("checked")) this.parentNode.parentNode.parentNode.children[k].children[0].children[0].removeAttribute("checked");
							}
							this.setAttribute("checked", "checked");
							priceH2.innerHTML = data[n].size[this.getAttribute("class")].price.toFixed(2) + "<br><b>" + data[n].size[this.getAttribute("class")].dimention + "</b>";	
						})
					}					

					var cartBt = document.getElementsByClassName("cart")[count];

					cartBt.addEventListener("click", function(){
						windowDiv.classList.add("visible");
						arr = [];
						for(var k = 0; k < this.parentNode.previousElementSibling.children.length; k++){
							if(this.parentNode.previousElementSibling.children[k].children[0].children[0].checked){
								arr.push(data[n].title);				
								arr.push(data[n].size[this.parentNode.previousElementSibling.children[k].children[0].children[0].getAttribute("class")].dimention);
								arr.push(data[n].size[this.parentNode.previousElementSibling.children[k].children[0].children[0].getAttribute("class")].price);
							}

						}
					})
				})(i)
				count++;
			}
		}

	for(var i = 0, count = 1; i < data.length; i+=6, count++){
			var li = document.createElement("li");
			var a = document.createElement("a");
			li.appendChild(a);
			ulPages.appendChild(li);
			(function(n){
				a.setAttribute("href", "#" + n);
				a.setAttribute("id", "#" + n);
				a.innerText = n + ". " ;
				Object.defineProperty(settings, a.getAttribute("href"), {
						value: {
							handler: function(){
								for(var i = 0; i < contentDiv.children.length; i++){
									contentDiv.children[i].style.display = "none";
								}
								for(var i = 0; i < divPage.children[0].children.length; i++){
									if(divPage.children[0].children[i].firstChild.getAttribute("class") == "curr"){
										divPage.children[0].children[i].firstChild.classList.remove("curr");
									}
								}
								document.getElementById(location.hash).classList.add("curr");
								document.getElementById(location.hash.slice(1)).style.display = "block";
							}
						}
				})
			})(count);
	}

	var change = function(){
		var callback = settings[location.hash].handler;
		callback();
	}

	window.onhashchange = function(){
		change();
	}

	if(location.hash in settings){ 
		change();
	}

	var xhr2 = new XMLHttpRequest();
	xhr2.open("GET", "additive.json", true);
	xhr2.onload = function(){

		var data1 = JSON.parse(this.responseText);
		
		divAdditive.innerHTML = "<button type='button' id='close'>X</button><h1>Добавки</h1>";

		data1.forEach(function(elem){
			divAdditive.innerHTML += "<label><input type='checkbox' id='" + elem.id + "'>" + elem.title + "<p>" + elem.price.toFixed(1) + "</p></label>";
		})

		divAdditive.innerHTML += "<button type='button' id='addSend'>Добавить</button>";

		windowDiv.addEventListener("click", function(e){
			if(e.target == this){
				this.classList.remove("visible");
			}
		})

		document.getElementById("close").addEventListener ("click", function(){
			windowDiv.classList.remove("visible");
		})

		var addSend = document.getElementById("addSend");
		addSend.addEventListener("click", function(){
			data1.forEach(function(elem){
				if(document.getElementById(elem.id).checked){
					arr[2] += elem.price;
					arr.push(elem.title);
				}
			})

			arrPurchase.push(arr);

			windowDiv.classList.remove("visible");

			numberOfPizza++;
			totalPrice += arr[2];
			console.log(arrPurchase);

			cartDiv.children[0].innerHTML = "количество пицц: " + numberOfPizza + "; общая стоимость: " + totalPrice.toFixed(2);

			totalCart.children[0].innerHTML = "";

				for(var i = 0; i < arrPurchase.length; i++){
				var tr = document.createElement("tr");
				totalCart.children[0].appendChild(tr);
				tr.innerHTML = arrPurchase[i][0] + " " + arrPurchase[i][1] + " ";
				if(arrPurchase[i].length == 3) tr.innerHTML +=" итого: " + arrPurchase[i][2];
				else{
					tr.innerHTML += "добавки: ";
					for(var k = 3; k < arrPurchase[i].length; k++){
						tr.innerHTML += arrPurchase[i][k];
						if(k != arrPurchase[i].length-1) tr.innerHTML += ", ";
					}
					tr.innerHTML += " итого: " + arrPurchase[i][2].toFixed(2);
				}
				tr.innerHTML += "<button type='button' class='delPurrchase'>x</button>";

				(function(n){
					document.getElementsByClassName("delPurrchase")[n].addEventListener("click", function(e){
						var index;
						for(var j = 0; j < e.target.parentNode.parentNode.children.length; j++) {
					        if(e.target.parentNode.parentNode.children[j].children[0] == e.target) index = j;
					    }
						numberOfPizza = numberOfPizza - 1;
						totalPrice = totalPrice - arrPurchase[index][2];
						this.parentNode.remove();
						arrPurchase.splice(index, 1);
						console.log(arrPurchase);
						
						cartDiv.children[0].innerHTML = "количество пицц: " + numberOfPizza + "; общая стоимость: " + totalPrice.toFixed(2);

					})
				})(i)

			}
		})

		cartCart.addEventListener("click", function(){
			totalCart.classList.toggle("totCart");
		})
	}
	xhr2.send();
}
xhr.send();