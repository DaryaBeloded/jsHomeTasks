var contentDiv = document.getElementsByClassName("content")[0];
var count = 0;
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
	for(var i = 0; i < data.length; i++){
	// data.forEach(function(elem){
		var div = document.createElement("div");
		div.classList.add("pizza");		

		var divImg = document.createElement("div");
		divImg.classList.add("pizzaImg");
		divImg.innerHTML = "<img src='images/" + data[i].img + "'>";

		var divDiscr = document.createElement("div");
		divDiscr.classList.add("pizzaDiscr");
		divDiscr.innerHTML = "<div class='title'><h1>" + data[i].title + "</h1></div>\n";
		divDiscr.innerHTML += "<div class='desc'><p>" + data[i].discription + "</p></div>\n";
		divDiscr.innerHTML += "<ul class='size'><li><label><input type='radio' id='bigSize' name='size" + count+1 + "' checked >Большая</label></li><li><label><input type='radio' name='size" + count+1 + "' id='avgSize'>Стандартная</label></li></ul><div class='price'><h2></h2><button type='button' class='cart'>В корзину</button></div>";
		// divDiscr.innerHTML += "<ul class='size'></ul>";
		div.appendChild(divImg);
		div.appendChild(divDiscr);
		contentDiv.appendChild(div);

		var ulSize = document.getElementsByClassName("size")[count];
		// for(key in elem.size){
		// 	// console.log(elem.size);
		// 	// ulSize.innerHTML += "<li><label><input type='radio' id='"+key+"' name='size" + count+1 + "' checked>" + key + "</label></li>";
		// }
		// console.log("lol");
		ulSize.firstChild.style.float = "left";
		var radioBig = ulSize.firstChild.firstChild.firstChild;
		var radioAvg = ulSize.lastChild.firstChild.firstChild;
		var priceH2 = document.getElementsByTagName("h2")[count];

		radioBig.addEventListener("change", function(){
			priceH2.innerHTML = data[i].size.priceBigSize.toFixed(2) + "<br><b>0.8-0.9 кг</b>";
		})
		priceH2.innerHTML = data[i].size.priceBigSize.toFixed(2) + "<br><b>0.8-0.9 кг</b>";

		radioAvg.addEventListener("change", function(){
			priceH2.innerHTML = data[i].size.priceAvgSize.toFixed(2) + "<br><b>0.6-0.7 кг</b>";
		})

		var cartBt = document.getElementsByClassName("cart")[count];
		console.log(cartBt);

		(function(n){
			cartBt.addEventListener("click", function(){
			console.log(data[n]);
			windowDiv.classList.add("visible");
			

			var radio = this.parentNode.previousElementSibling;
			if(radio.firstChild.firstChild.firstChild.checked){

				totalPrice += data[n].size.priceBigSize;
				console.log(data[n].priceBigSize)
				cartDiv.children[0].innerHTML = "количество пицц: " + (numberOfPizza + 1) + "; общая стоимость: " + totalPrice.toFixed(2);
				console.log(this.parentNode.children[0].children[1])
				totalCart.innerHTML += data[n].title + "  " + this.parentNode.children[0].children[1].outerText + "  "+ data[n].size.priceBigSize.toFixed(2) + "<br>";				
			}
			if(radio.lastChild.firstChild.firstChild.checked){
				totalPrice += data[n].size.priceAvgSize;
				console.log(data[n].priceAvgSize)
				cartDiv.children[0].innerHTML = "количество пицц: " + (numberOfPizza + 1) + "; 	общая стоимость: " + totalPrice.toFixed(2);
				console.log(this.parentNode.children[0].children[1])
				totalCart.innerHTML += data[n].title + this.parentNode.children[0].children[1].outerText + "  "+ data[n].size.priceAvgSize.toFixed(2)+ "<br>";
			}
			numberOfPizza++;
		})})(i)

		count++;
	}

	windowDiv.addEventListener("click", function(e){
		if(e.target == this){
			this.classList.remove("visible");
		}
	})

	document.getElementById("close").addEventListener ("click", function(){
		windowDiv.classList.remove("visible");
	})

	cartCart.addEventListener("click", function(){
		totalCart.classList.toggle("totCart");
	})
}
xhr.send();