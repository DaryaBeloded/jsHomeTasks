var table = document.getElementsByTagName("table")[0];
var arr = [];
var size = prompt("Enter a size of array: ");
for(var i = 2; i <= size; i++){
	arr[i] = i;
}
console.log(arr.length);

for(var i = 1; i < arr.length; i++){
	if((i-1)%10==0){
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
		td.setAttribute("id", "i"+i);
		table.appendChild(td);
		td.innerText = arr[i];
	}
}

var p = arr[2];
var time = 0;
do{
	for( i = 2*p; i< arr.length; i+= p){
		setTimeout((function(i){
			return function(){
				var str = "i" + i;
				var td = document.getElementById(str);
				td.setAttribute("a","notSimple");
				}
		})(i), time)
		time+=250;
	}
	for( i=p+1; i<arr.length; i++){
		var str = "i" + i;
		var td = document.getElementById(str);
		if(!td.hasAttribute("a")){
			break;
		}
	}
	p = i;
} while(p*p<arr.length-1);

var arr2=[];
for(var i = 2, k=0; i < arr.length; i++){
	var str = "i" + i;
	var td = document.getElementById(str);
	if(!td.hasAttribute("a")){
		arr2[k] = arr[i];
		k++;
	}
}

for(var i = 0; i<arr2.length; i++){
	for(var l = 2; l<arr.length; l++){
		if(arr2[i] == arr[l]){
				var str = "i" + arr2[i];
				var td = document.getElementById(str);
				td.className = "simple";
			
		}
	}
}


// for (var i = 2; i <= size; i++) {
//   arr[i] = true
// }

// for(var i = 1; i < arr.length; i++){
// 	if((i-1)%10==0){
// 		var tr = document.createElement("tr");
// 		table.appendChild(tr);
// 	}
// 	if(i==1){
// 		var td = document.createElement("td");
// 		td.setAttribute("id", "first");
// 		table.appendChild(td);
// 	}	
// 	else{
// 		var td = document.createElement("td");
// 		td.setAttribute("id", "i"+i);
// 		table.appendChild(td);
// 		td.innerText = i;
// 	}
// }

// var p = 2;
// do {
//   for (i = 2 * p; i < size; i += p) {
//     arr[i] = false;
//   }
//   for (i = p + 1; i < size; i++) {
//     if (arr[i]) break;
//   }
//   p = i;
// } while (p * p < size); 

// var time = 0;
// for(var i=2; i<arr.length; i++){
// 	setTimeout((function(n){
// 		return function(){
// 			if(!arr[i]){
// 				console.log(i);
// 				var str = "i" + i;
// 				console.log(str);
// 				var td = document.getElementById(str);
// 				// td.className = "notSimple";
// 				td.style.backgroundColor = 'red';
// 			}
// 		}
// 	})(i), time)
// 	time += 250;
// }



