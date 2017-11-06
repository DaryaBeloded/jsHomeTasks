var arrayofimage = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg",
				  	"1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg"];
var newgame = document.getElementById("newgame");
var hint = document.getElementById("hint");
var maindiv = document.getElementById("maindiv");
var timer = document.getElementById("timer");
var divcount = document.getElementById("count");
var divaudio = document.getElementById("audio")
var select = document.getElementsByTagName("select")[0];
var table, RandomNumb = [], folder, timerId = 0, numberofhints, hours, minutes, seconds, numberofsteps, result;
var hint1 = document.getElementById("hint1");
var counter;

divaudio.style.left= newgame.getBoundingClientRect().width + hint1.getBoundingClientRect().width + hint.getBoundingClientRect().width + select.getBoundingClientRect().width + 30 + "px";

var initRandomArray = function(n){
	var i, arr = [], res = [];
	for (i = 0; i < n; i++) arr.push(i);
	for (i = 0; i < n; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0]);
	return res;
}

var createLine = function(i, tr){
	var td = document.createElement("td"); 
	tr.appendChild(td);	
	var maindiv = document.createElement("div");
	maindiv.classList.add("block");
	td.appendChild(maindiv);
	var divfront = document.createElement("div"); 
	divfront.classList.add("side");
	divfront.classList.add("front");
	maindiv.appendChild(divfront);
	var image = document.createElement("img");
	divfront.appendChild(image);
	image.setAttribute("src","images/back_fon.jpg");	
	var back = document.createElement("div");
	back.classList.add("back");
	back.classList.add("side");
	var img = document.createElement("img");
	back.appendChild(img);
	img.setAttribute("src","images/"+folder + arrayofimage[RandomNumb[i]]);		
	maindiv.appendChild(back);	
}

var createTable = function(){
	maindiv.innerHTML = "<table id = 'table'></table>";
	table = document.getElementsByTagName("table")[0];
	RandomNumb = initRandomArray(24);
	for (var i = 0; i <= 23; i++){
		if(i % 8 == 0){ 
			var tr = document.createElement("tr"); 
			table.appendChild(tr); 
		} 
		if(i == 1) createLine(i, tr);
		else createLine(i, tr);
	}
}

var createTimer = function(){
	hours = 0, minutes = 0, seconds = 0;
	timer.innerText = "Время: " + "0" + hours + ":" + "0" + minutes + ":" + "0" + seconds;
	clearTimeout(timerId);
	timerId = setInterval(function(){
		hours = Number(hours);
		minutes = Number(minutes);
		seconds = Number(seconds);
		seconds++;
		if (seconds == 60) {
			minutes++;
			seconds = 0;
		}
		if (minutes == 60){
			hours++;
			minutes = 0;
		}
		(seconds < 10) ? seconds = "0" + seconds:seconds;
		(minutes < 10) ? minutes = "0" + minutes:minutes;
		(hours < 10) ? hours = "0" + hours:hours;
		timer.innerText = "Время: " + hours + ":" + minutes + ":" + seconds;
	},1000);	
}

var createHint = function(numberofhints){
	hint.addEventListener("click",function(){
		if (numberofhints > 0){
			for (var i = 0; i < 47; i++){
				document.getElementsByTagName("img")[i].parentNode.parentNode.classList.add("rotated2");
			}
			setTimeout(function(){
				for (var i = 0; i < 47; i++){
					document.getElementsByTagName("img")[i].parentNode.parentNode.classList.remove("rotated2");
				}
			},3000)
			numberofhints--;
		};
		hint.lastChild.innerText ="(" + numberofhints + ")";
	});
}

hint1.addEventListener("click", function(){
	if(counter>0){
	var arr = [];
	var res = initRandomArray(12);
	for(var i = 0; i < res.length; i++){
		console.log(arrayofimage[res[i]]);
		for(var a = 1; a < 48; a++){
			if(document.getElementsByTagName("img")[a].getAttribute("src")=="images/"+select.value+"/"+arrayofimage[res[i]]){
				arr.push(a);
			}
		}
		if(arr.length==2)
			break;
	}

	arr.forEach(function(elem){
		document.getElementsByTagName("img")[elem].parentNode.parentNode.classList.add("light");
	})
	counter--;
	setTimeout(function(){
		arr.forEach(function(elem){
		document.getElementsByTagName("img")[elem].parentNode.parentNode.classList.remove("light");
	})
		
	}
	, 3000);

	hint1.lastChild.innerText = "Подсказка(" + counter + ")";
}
})

var createClickOnImage = function(numberofsteps, result){
	table.addEventListener("click", function(e){
		if (e.target.getAttribute("src") == "images/GALOCHKA.jpg"){
			return;
		}	
		var k = 0, arrTrue = [];
		for(var i = 0; i < 47; i++){
			if(document.getElementsByTagName("img")[i].hasAttribute("a")){
				k++;
			}
		}
		if ((k <= 1) && (!e.target.hasAttribute("a")) && (!e.target.childNodes.length)) {
	  				e.target.parentNode.parentNode.classList.add("rotated1");
	  				e.target.setAttribute("a","true");
		}
		if (k == 1){
			arrTrue =[];
			for(var i = 0; i < 47; i++){
				if(document.getElementsByTagName("img")[i].hasAttribute("a")){
					arrTrue.push(document.getElementsByTagName("img")[i]);
				}
			}
			var firstcard = arrTrue[0].parentNode.parentNode.children[1].childNodes[0];
			var secondcard = arrTrue[1].parentNode.parentNode.children[1].childNodes[0]; 
			if(firstcard.src == secondcard.src && (firstcard.x != secondcard.x || firstcard.y != secondcard.y)){
				setTimeout(function(){
					firstcard.setAttribute("src","images/GALOCHKA.jpg");
					secondcard.setAttribute("src","images/GALOCHKA.jpg");
					arrTrue[0].removeAttribute("a");
					arrTrue[1].removeAttribute("a");
					result++;
					if (result == 12){
						result = confirm("Поздравляем, Вы выиграли! Время игры составило: " + hours + ":" + minutes + ":" + seconds + ". Количество ходов: " + numberofsteps + ". Желаете начать новую игру?");
						if (result)	createGame();
					}
				},1000);
				divcount.innerText = "Количество ходов: " + ++numberofsteps;
			}
			else {
				setTimeout(function(){
					arrTrue[0].parentNode.parentNode.classList.remove("rotated1");
					arrTrue[1].parentNode.parentNode.classList.remove("rotated1");
					arrTrue[0].removeAttribute("a");
					arrTrue[1].removeAttribute("a");
					
				},1000);
				divcount.innerText = "Количество ходов: " + ++numberofsteps;
			}
		}
	})
}

var createSound = function(){
	divaudio.innerHTML = "<audio controls autoplay loop><source src='audio.mp3' type='audio/mpeg'></audio>"
}

var createGame = function(){
	result = 0; 
	numberofsteps = 0;
	numberofhints = 3;
	counter = 3;
	hint.lastChild.innerText = "(" + numberofhints + ")";
	hint1.lastChild.innerText = "Подсказка(" + counter + ")";
	divcount.innerText = "Количество ходов: " + numberofsteps;
	createTable();
	createTimer();
	createHint(numberofhints);
	createSound();
	createClickOnImage(numberofsteps, result);
}

newgame.addEventListener("click", function(){
	folder = select.value + "/";
	if (table == undefined) createGame()
	else {
		table.remove();
		createGame();
	}
	
})