var table = document.getElementsByTagName("table")[0];
// var arr = [];
var size = prompt("Enter a size of array: ");
// for(var i = 2; i <= size; i++){
// 	arr[i] = i;
// }
// console.log(arr.length);
var TableCells = document.getElementsByTagName("td");

var tableSize = Math.round(Math.sqrt(size));
for(var i = 1; i <= size; i++){
	if((i-1)%tableSize==0){
		var tr = document.createElement("tr");
		table.appendChild(tr);
	}
	if(i==1){
		var td = document.createElement("td");
		td.setAttribute("id", "first");
		table.appendChild(td);	
	}	
	else{
		var td = document.createElement("td");
		table.appendChild(td);
		td.innerText = i;
	}
}

function getTableCellWithNumber(n){
	return TableCells[n-1];
}

// Current P
var currentN = 2;
// Last number that was marked as not simple
var lastMarked = 2;

// Array with all numbers that was marked
var marked = [];

var N = size;

window.mainInterval = window.setInterval(function(){
	lastMarked += currentN;
	if(lastMarked > N){
		do{
			currentN++;
			lastMarked = currentN*2;
		}while(marked.indexOf(currentN)!=-1)
	}
	
	
	
	
	//console.log(currentN > N)
	if(currentN > N){
		return window.clearInterval(window.mainInterval);
	}
	printSimpleCell(currentN);
	
	if(currentN > Math.sqrt(N)+1){
		return;	
		// Print all tds with no class notSimple
		//printPrimes();
	}

	getTableCellWithNumber(lastMarked).setAttribute("class","notSimple");
	if(marked.indexOf(lastMarked)==-1){
		marked.push(lastMarked);
	}
},25);

function printSimpleCell(n){
	getTableCellWithNumber(n).setAttribute("class", "simple");
}

function printPrimes(){
	var TableCellsWithPrimes = document.querySelectorAll('td:not([class="notSimple"])');
	var i = 0;
	var interval = window.setInterval(function(){
		TableCellsWithPrimes[i].setAttribute("class","simple");
		if(++i >= TableCellsWithPrimes.length){
			window.clearInterval(interval);
		}
	},200)
}


// var p = arr[2];
// var time = 0;
// do{
// 	for( i = 2*p; i< arr.length; i+= p){
// 		setTimeout((function(i){
// 			return function(){
// 				var str = "i" + i;
// 				var td = document.getElementById(str);
// 				td.setAttribute("a","notSimple");
// 				}
// 		})(i), time)
// 		time+=250;
// 	}
// 	for( i=p+1; i<arr.length; i++){
// 		var str = "i" + i;
// 		var td = document.getElementById(str);
// 		if(!td.hasAttribute("a")){
// 			break;
// 		}
// 	}
// 	p = i;
// } while(p*p<arr.length-1);

// var arr2=[];
// for(var i = 2, k=0; i < arr.length; i++){
// 	var str = "i" + i;
// 	var td = document.getElementById(str);
// 	if(!td.hasAttribute("a")){
// 		arr2[k] = arr[i];
// 		k++;
// 	}
// }

// for(var i = 0; i<arr2.length; i++){
// 	for(var l = 2; l<arr.length; l++){
// 		if(arr2[i] == arr[l]){
// 				var str = "i" + arr2[i];
// 				var td = document.getElementById(str);
// 				td.className = "simple";
			
// 		}
// 	}
// }





