var names = ["Roma", "Dasha", "Vika","Katya","Olya","Igor","Stepa","Misha","Lyba","Lyda","Nikita"];
var cities = ["Baranovichi", "Polotsk", "Novopolotsk", "Vitebsk", "Mogilev"]

var divMain = document.getElementsByClassName("main")[0];

setInterval(function(){
	var okno = document.createElement("div");
		okno.setAttribute("class", "okno");

	var human = {};
		human.name = names[Math.floor(Math.random() * (names.length))];
		human.city = cities[Math.floor(Math.random() * (cities.length))];

	var pName = document.createElement("p");
		pName.setAttribute("id", "name");
		pName.innerText = "name: ";
	var b1 = document.createElement("b");
		b1.innerText = human.name;
		pName.appendChild(b1);

	okno.appendChild(pName);

	var pCity = document.createElement("p");
		pCity.innerText = "city: ";
		pCity.setAttribute("id", "city");
	var b2 = document.createElement("b");
		b2.innerText = human.city;
		pCity.appendChild(b2);

	okno.appendChild(pCity);

	divMain.appendChild(okno);

	setInterval(function(){
		okno.remove();
	},8000)

},2000);

