var div = document.getElementsByClassName("oclock")[0];
var p = document.createElement("p");
p.setAttribute("class","p-oclock");
div.appendChild(p);
var p1 = document.getElementsByClassName("p-oclock")[0];
console.log(p1);

setInterval(function(){
	var k= new Date();
	var endOfTheDay = new Date();
	endOfTheDay.setHours(23,59,59,59);
	var hours = endOfTheDay.getHours() - k.getHours();
	var minutes = endOfTheDay.getMinutes() - k.getMinutes();
	var seconds = endOfTheDay.getSeconds() - k.getSeconds();
	// if(seconds%2==0){
		// if(seconds<10 && minutes<10 && hours<10)
		// 	p1.innerText = "0" + hours + ":" + "0" + minutes  +":" + "0" + seconds ;
		// else if(hours<10&&minutes<10)
		// 		p1.innerText = "0" + hours + ":" + "0" + minutes  +":" + seconds ;
		// 	else if(hours<10&&seconds<10)
		// 			p1.innerText = "0" + hours + ":" + minutes  +":" + "0" + seconds ;
		// 		else if(seconds<10&&minutes<10)
		// 				p1.innerText = hours + ":" + "0" + minutes  +":" + "0" + seconds ;
		// 			else if(hours<10)
		// 					p1.innerText ="0" + hours + ":" + minutes  +":"+ seconds;
		// 				else if(seconds<10)
		// 						p1.innerText = hours + ":" + minutes  +":"+"0"+ seconds;
		// 					else if (minutes<10)
		// 							p1.innerText = hours + ":" +"0"+ minutes  +":"+ seconds;
		// 						else
		// 							p1.innerText = hours + ":" + minutes  +":"+ seconds;

		if(seconds<10)
			seconds = "0"+seconds;
		if(hours<10)
			hours = "0"+hours;
		if(minutes<10)
			minutes="0"+minutes;
		p1.innerText = hours + ":" + minutes  +":"+ seconds;
		setTimeout(function(){
			p1.innerText = hours + " " + minutes  +" "+ seconds;
		},500)
	// }
	// else{
		// if(seconds<10 && minutes<10 && hours<10)
		// 	p1.innerTextL ="0" + hours + " " + "0" + minutes  +" "+"0"+ seconds;
		// else if(hours<10&&minutes<10)
		// 		p1.innerText = "0" + hours + " " + "0" + minutes  +" " + seconds ;
		// 	else if(hours<10&&seconds<10)
		// 			p1.innerText = "0" + hours + " " + minutes  +" " + "0" + seconds ;
		// 		else if(seconds<10&&minutes<10)
		// 				p1.innerText = hours + " " + "0" + minutes  +" " + "0" + seconds ;
		// 			else if(hours<10)
		// 					p1.innerText = "0" + hours + " " + minutes  +" "+ seconds;
		// 				else if(seconds<10)
		// 						p1.innerText = hours + " " + minutes  +" "+"0"+ seconds;
		// 					else if (minutes<10)
		// 							p1.innerText =hours + " " +"0"+ minutes  +" "+ seconds;
		// 						else
		// 							p1.innerText = hours + " " + minutes  +" "+ seconds;
	// }
},1000);

