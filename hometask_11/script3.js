var ul = document.getElementsByTagName("ul")[0];
var div = document.getElementById("main");
var xhr = new XMLHttpRequest();
xhr.open("GET", "goods.csv", true);
xhr.onload = function(){
	var arr = this.responseText.split(/\r\n/).map(function(elem){return elem.split(", ")});

	var data = [];

	for(var i = 1; i < arr.length; i++){
		var obj = {};
		var k = 0;
		arr[0].forEach(function(elem){
			Object.defineProperty(obj, elem, {
				value: arr[i][k]
			})
			k++;
		})
		data.push(obj);
	}

	ul.innerHTML = "";
	var currGoods = 0;
	var currPrice = 0;
	div.innerText = "Number of goods: " + currGoods + "; Full price: " + currPrice;

	data.forEach(function(elem){
		ul.innerHTML += "<li>" + elem.name + "  " + elem.price + "  " + elem.country + "<form><button type='button' class='btMinus'>-</button><input type='text' id='inp' disabled><button type='button' class='btPlus'>+</button><button type='button' class='btCart'>add in cart</button></form></li>";
	})
	for(var i = 0; i < data.length; i++){
		(function(n){
			var btMinus = document.getElementsByClassName("btMinus")[n];
			var btPlus = document.getElementsByClassName("btPlus")[n];
			// var inp = document.getElementById("inp");
			var inp = document.getElementsByTagName("input")[n];
			inp.value = 0;
			var btCart = document.getElementsByClassName("btCart")[n];
			var li = document.getElementsByTagName("li")[n];
			btMinus.addEventListener("click", function(){
				if(inp.value > 0){
					inp.value = Number(inp.value) - 1;
				}
			})

			btPlus.addEventListener("click", function(){
				inp.value = Number(inp.value) + 1;
			})

			btCart.addEventListener("click", function(){
				alert(" Товар " + data[n].name + " в количестве " + inp.value + " добавлен в корзину ");
				currGoods += Number(inp.value);
				currPrice += data[n].price*Number(inp.value);
				div.innerText = "Number of goods: " + currGoods + "; Full price: " + currPrice; 
			})


		})(i)
	}

}
xhr.send();