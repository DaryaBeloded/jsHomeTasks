// создать объект Точка с полями х и у, в которые можно записывать только числа (проверить settom, выводить gettom (читать)), по умолчанию будут ==0
// Создать метод в точке, который принимает в себя другую точку и возвращает расстояние между ними

var point = {
	_x: 0,
	_y: 0
};

Object.defineProperty(point, "_x", {
	// writable: false
})

Object.defineProperty(point, "x", {
	get: function(){
		return this._x;
	},
	set: function(val){
		if((/^[0-9]{1,}$/).test(val))
			this._x = Number(val);
	}
})
point.__defineGetter__("y", function(){
	return this._y;
})
point.__defineSetter__("y", function(val){
	if((/^[0-9]{1,}$/).test(val))
		this._y = Number(val);
})

Object.defineProperty(point, "distance", {
	value: function(x, y){
		if((/^[0-9]{1,}$/).test(x) && (/^[0-9]{1,}$/).test(y))
			return Math.sqrt(Math.pow(x-this._x,2)+Math.pow(y-this._y,2));
	}
})
//----------------------------------------------------------------------------------------------------------------------------------------

// Создать класс Товар; его поля: id(увеличивается на 1 при создании), название, тип, цена, дата выпуска. На основе класса Товар создать класс Продовольственный товар, у которого добавятся поля годен до и свойство(только на чтение) срок хранения. Создать класс Магазин; его поля: название, адрес, массив товаров, наценка, доход. Свойства - общая сумма стоимости товаров. Методы - добавить товвар в количестве n, списать несколько товаров, продать несколько товаров, а также метод о выводе информации о магазине. Создать объект рынок; его методы - вывод всех магазинов и их статистики.

var id = 1;

function Product(title, type, price, releaseDate){
	this.id = id++;
	this.title = title;
	this.type = type;
	this.price = price;
	this.release = releaseDate;
}

function FoodProduct(title, type, price, releaseDate, validDate){
	Product.apply(this, arguments);
	this.valid = validDate;
	Object.defineProperty(this, "shelfLife", {
		get: function(){
			return (this.valid - this.release)/3600000;
		}
	})
}
// FoodProduct.prototype = new Product();
FoodProduct.prototype = Object.create(Product.prototype);
FoodProduct.prototype = {
	constructor: FoodProduct
}

// var food1 = new FoodProduct("goods1", "type1", 7300, new Date("2017-11-09"), new Date("2017-11-10"));
// var food7 = new FoodProduct("goods1", "type1", 7300, new Date("2017-11-09"), new Date("2017-11-10"));
// var food2 = new FoodProduct("goods2", "type2", 900, new Date("2017-11-03"), new Date("2017-11-17"));
// var food3 = new FoodProduct("goods3", "type3", 5400, new Date("2017-11-01"), new Date("2017-11-10"));
// var food4 = new FoodProduct("goods4", "type4", 20000, new Date("2017-10-18"), new Date("2017-11-23"));
// var food5 = new FoodProduct("goods5", "type5", 750, new Date("2017-11-10"), new Date("2017-11-29"));
// var product = new Product("goods6", "type6", 7300, new Date("2017-11-09"));

function Shop(title, address, products, markup, income){
	this.title = title;
	this.address = address;
	this.products = products;
	this.markup = markup;
	this.income = income;
	Object.defineProperty(this, "fullPrice", {
		get: function(){
			var sum = 0;
			this.products.forEach(function(elem){
				sum += elem.goods.price*elem.quantity;
			})
			return sum;
		}
	})
}
function comparison(pr1, pr2){
	if(pr1.constructor == pr2.constructor){
		if(((pr1 instanceof Product) && pr1.title == pr2.title && pr1.price == pr2.price && pr1.type == pr2.type && pr1.release.getTime() == pr2.release.getTime()) || (((pr1 instanceof FoodProduct) && pr1.title == pr2.title && pr1.price == pr2.price && pr1.type == pr2.type && pr1.release.getTime() == pr2.release.getTime() && pr1.valid.getTime() == pr2.valid.getTime()))){
			return true;
		}
	}
	return false;
}
// function comparisonShop(sh1, sh2){
// 	if(sh1.title == sh2.title && sh1.address == sh2.adddress && sh1.markup == sh2.markup && sh1.income == sh2.income){
// 		return true;
// 	}
// 	else
// 		return false;
// }
Shop.prototype.addNProduct = function(n, newPr){
	for(var i = 0; i < this.products.length; i++){
		if(comparison(this.products[i].goods, newPr)){
			this.products[i].quantity += n;
			return;
		}	
	}
	var newGoods = {
		quantity: n,
		goods: newPr // изменить на массив из-за id 	
	}
	this.products.push(newGoods);
}
Shop.prototype.remove = function(n, pr){
	for(var i = 0; i < this.products.length; i++){
		if(comparison(this.products[i].goods,pr)){ 
			this.products[i].quantity += -n;
			if(this.products[i].quantity <= 0)
				this.products.splice(i, 1);
			return true;
		}
	}
	return false;
}
Shop.prototype.sell = function(n, pr){
	for(var i = 0; i < this.products.length; i++){
		if(comparison(this.products[i].goods, pr) && this.products[i].quantity >= n){
			this.income += (this.products[i].goods.price + this.products[i].goods.price*(this.markup/100))*n;
			this.remove(n, pr);
			return true;
		}
	}
	return false;
}
Shop.prototype.toString = function(){
	enumerable: false;
	console.log("title: " + this.title + "; \n address: " + this.address + "; \n products: " + this.products + "; \n markup: " + this.markup + "; \n income: " + this.income + "; \n");
	return this.title + " " + this.address + " " + this.products + " " + this.markup + " " + this.income;
}

// var listOfProducts = [{quantity: 10, goods: food1}, {quantity: 3, goods: food3}];
// var shop1 = new Shop("shop1", "adress1", listOfProducts, 3, 10000);
// shop1.addNProduct(5, food1);
// shop1.addNProduct(7, product);
// shop1.remove(3, food3);
// shop1.sell(7, food1);
// var listOfProducts2 = [{quantity: 15, goods: food1}, {quantity: 3, goods: food3}, {quantity: 14, goods: food5}];
// var shop2 = new Shop("shop1", "adress1", listOfProducts, 3, 10000);


function Market(title, shops){
	this.title = title;
	this.shops = shops;
}
Market.prototype.toString = function(){
	enumerable: false;
	this.shops.sort(function(sh1, sh2){
		return sh2.income - sh1.income;
	})
	console.log(this.title + " :\n");
	this.shops.forEach(function(elem){
		console.log("	" + elem.title + ": " + elem.income + "\n");
	})
}

// var shops1 = [];
// shops1.push(shop1);
// shops1.push(shop2);
// var market1 = new Market("market1", shops1);

//----------------------------------------------------------------------------------------------------------------------------

var select = document.getElementsByTagName("select");
var bt = document.getElementsByTagName("button")[0];
var bt1 = document.getElementsByTagName("button")[1];
var bt2 = document.getElementsByTagName("button")[2];
var btAddShop2 = document.getElementById("add_shop2");
var btAddShop = document.getElementById("add_shop");
var btAddNPr = document.getElementById("add_N");
var btAddNPr2 = document.getElementById("add_N2");
var btRemoveN = document.getElementById("remove_N");
var btRemoveN2 = document.getElementById("remove_N2");
var btFullPrice = document.getElementById("full_price");
var btFullPrice2 = document.getElementById("full_price2");
var divAddPr = document.getElementsByClassName("add_product")[0];
var divAddFoodPr = document.getElementsByClassName("add_food_product")[0];
var divAddShop = document.getElementsByClassName("add_shop")[0];
var productsHtml = [];
var shopsHtml = [];
var listOfProducts = [];

bt.addEventListener("click", function(){
	for(var i = 1; i < select[0].parentNode.parentNode.parentNode.children.length - 1; i++){
		select[0].parentNode.parentNode.parentNode.children[i].classList.add("false");
	}
	if(select[0].value == "add_product"){		
		divAddPr.classList.remove("false");
	}
	if(select[0].value == "add_food_product"){		
		divAddFoodPr.classList.remove("false");
	}
	if(select[0].value == "add_shop"){
		for(var i = 1; i < divAddShop.children.length; i++){
			divAddShop.children[i].classList.add("false");
		}
		divAddShop.classList.remove("false");
	}
})



bt1.addEventListener("click", function(){
	var counter = 0;
	var counter1 = 0;
	for(var i = 0; i < this.parentNode.children.length - 1; i++){
		if(this.parentNode.children[i].value != ""){
			counter++;
		}
	}
	if(counter == 4){
		var pr = new Product(this.parentNode.children[0].value, this.parentNode.children[1].value, Number(this.parentNode.children[2].value), new Date(this.parentNode.children[3].value))
		if(productsHtml.length!=0){
			productsHtml.forEach(function(elem){
				if(!comparison(elem, pr)){
					counter1++;
				}
			})
			if(counter1==productsHtml.length){
				productsHtml.push(pr);
				console.log(productsHtml);
			}
		}
		else{
			productsHtml.push(pr);
			console.log(productsHtml);
		}
	}
	else {
		for(var i = 0; i < this.parentNode.children.length - 1; i++){
			if(this.parentNode.children[i].value == ""){
				this.parentNode.children[i].focus();
			}
		}
	}
})

bt2.addEventListener("click", function(){
	var counter = 0;
	var counter1 = 0;
	for(var i = 0; i < this.parentNode.children.length - 1; i++){
		if(this.parentNode.children[i].value != ""){
			counter++;
		}
	}
	if(counter == 5){
		var pr = new FoodProduct(this.parentNode.children[0].value, this.parentNode.children[1].value, Number(this.parentNode.children[2].value), new Date(this.parentNode.children[3].value), new Date(this.parentNode.children[4].value));
		if(productsHtml.length!=0){
			productsHtml.forEach(function(elem){
				if(!comparison(elem, pr)){
					counter1++;
				}
			})
			if(counter1==productsHtml.length){
				productsHtml.push(pr);
				console.log(productsHtml);
			}
		}
		else{
			productsHtml.push(pr);
			console.log(productsHtml);
		}
	}
	else {
		for(var i = 0; i < this.parentNode.children.length - 1; i++){
			if(this.parentNode.children[i].value == ""){
				this.parentNode.children[i].focus();
			}
		}
	}
})

btAddShop.addEventListener("click", function(){
	for(var i = 1; i < divAddShop.children.length; i++){
		divAddShop.children[i].classList.add("false");
	}
	divAddShop.children[1].classList.remove("false");
})

btAddNPr.addEventListener("click", function(){
	for(var i = 1; i < divAddShop.children.length; i++){
		divAddShop.children[i].classList.add("false");
	}
	divAddShop.children[2].classList.remove("false");
	for(var i = 0; i < select[1].children.length; i++){
		select[1].children[i].remove();
	}
	shopsHtml.forEach(function(elem){
		var opt = document.createElement("option");
		opt.innerText = elem.toString();
		select[1].appendChild(opt);
	})
	for(var i = 0; i < select[2].children.length; i++){
		select[2].children[i].remove();
	}
	productsHtml.forEach(function(elem){
		var opt = document.createElement("option");
		opt.innerText = elem.title +" " + elem.type+" " + elem.price+" " + elem.release;
		select[2].appendChild(opt);
	})
})

btRemoveN.addEventListener("click", function(){
	for(var i = 1; i < divAddShop.children.length; i++){
		divAddShop.children[i].classList.add("false");
	}
	divAddShop.children[2].classList.remove("false");
	for(var i = 0; i < select[4].children.length; i++){
		select[4].children[i].remove();
	}
	shopsHtml.forEach(function(elem){
		var opt = document.createElement("option");
		opt.innerText = elem.toString();
		select[4].appendChild(opt);
	})
	for(var i = 0; i < select[5].children.length; i++){
		select[5].children[i].remove();
	}
	productsHtml.forEach(function(elem){
		var opt = document.createElement("option");
		opt.innerText = elem.title +" " + elem.type+" " + elem.price+" " + elem.release;
		select[5].appendChild(opt);
	})
})

btFullPrice.addEventListener("click", function(){
	for(var i = 1; i < divAddShop.children.length; i++){
		divAddShop.children[i].classList.add("false");
	}
	divAddShop.children[3].classList.remove("false");
	for(var i = 0; i < select[3].children.length; i++){
		select[3].children[i].remove();
	}
	shopsHtml.forEach(function(elem){
		var opt = document.createElement("option");
		opt.innerText = elem.toString();
		select[3].appendChild(opt);
	})
	
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
btFullPrice2.addEventListener("click", function(){
	this.parentNode.children[2].value = "";
	if(shopsHtml[select[3].selectedIndex].products.length!=0)
		this.parentNode.children[2].value = shopsHtml[select[3].selectedIndex].fullPrice;	
	else
		this.parentNode.children[2].value = 0;
})

btAddShop2.addEventListener("click", function(){
	var k=0, counter = 0;
	for(var i = 0; i < this.parentNode.children.length - 1; i++){
		if(this.parentNode.children[i].value != ""){
			counter++;
		}
	}
	if(counter == 4){
		var shop = new Shop(this.parentNode.children[0].value, this.parentNode.children[1].value, listOfProducts, Number(this.parentNode.children[2].value), Number(this.parentNode.children[3].value));
		// if(shopsHtml.length!=0){
		// 	shopsHtml.forEach(function(elem){
		// 		if(!comparisonShop(elem, shop)){
		// 			k++;
		// 		}
		// 	})
		// 	if(k==shopsHtml.length){
		// 		shopsHtml.push(shop);
		// 		console.log(shopsHtml);
		// 	}
		// }
		// else{
			shopsHtml.push(shop);
				console.log(shopsHtml);
		// }

	}
	else {
		for(var i = 0; i < this.parentNode.children.length - 1; i++){
			if(this.parentNode.children[i].value == ""){
				this.parentNode.children[i].focus();
			}
		}
	}
})

btAddNPr2.addEventListener("click", function(){
	if(this.parentNode.children[0]!="" && productsHtml.length!=0 && shopsHtml.length!=0){
		console.log(shopsHtml[select[1].selectedIndex]);
		console.log(productsHtml[select[2].selectedIndex]);
		shopsHtml[select[1].selectedIndex].addNProduct(this.parentNode.children[0].value,productsHtml[select[2].selectedIndex]);
		this.parentNode.children[0].value.toString();
	}
	else{
		this.parentNode.children[0].focus();
	}
})

btRemoveN2.addEventListener("click", function(){
	if(this.parentNode.children[0]!="" && productsHtml.length!=0 && shopsHtml.length!=0){
		// console.log(shopsHtml[select[4].selectedIndex]);
		// console.log(productsHtml[select[5].selectedIndex]);
		shopsHtml[select[4].selectedIndex].remove(this.parentNode.children[0].value,productsHtml[select[5].selectedIndex]);
		// this.parentNode.children[0].value.toString();
	}
	else{
		this.parentNode.children[0].focus();
	}
})





