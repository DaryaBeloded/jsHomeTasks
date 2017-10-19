var input = document.getElementsByTagName("input")[0];
var btSum = document.getElementsByClassName("operation")[0];
var btDiff = document.getElementsByClassName("operation")[1];
var btMult = document.getElementsByClassName("operation")[2];
var btDiv = document.getElementsByClassName("operation")[3];
var btCalc = document.getElementsByClassName("calculated")[0];
var btMemory = document.getElementsByClassName("memory")[0];
var btEject = document.getElementsByClassName("eject")[0];
var btClear = document.getElementsByClassName("clear")[0];
var memory;

for(var i = 0; i < 10; i++){
	var btDigit = document.getElementsByClassName("digits")[i];
	btDigit.addEventListener("click", function(){
		input.value += this.value;
		input.focus();
	})
}

// window.addEventListener("keypress", function(event){
// 	if(event.keyCode == 13)
// 		btCalc.click();
// })
btSum.addEventListener("click", function(){
	input.value += "+";
	input.focus();
})
btDiff.addEventListener("click", function(){
	input.value += "-";
	input.focus();
})
btMult.addEventListener("click", function(){
	input.value += "*";
	input.focus();
})
btDiv.addEventListener("click", function(){
	input.value += "/";
	input.focus();
})
btCalc.addEventListener("click", function(){
	var str = input.value;
	if((/^[0-9]{1,}\.?([0-9]{1,})?/).test(str) && (/[\+\-\*\/][0-9]{1,}\.?([0-9]{1,})?$/).test(str)){
		var a = Number(str.match(/^[0-9]{1,}\.?([0-9]{1,})?/)[0]);
		var second = str.match(/[\+\-\*\/]-?[0-9]{1,}\.?([0-9]{1,})?$/)[0];
		var b = Number(second.slice(1));
		var operation = second[0];
	}
	else{
		input.value = "you loser!";
		alert("you loser!");
		setTimeout(function(){
			btClear.click();
		},1000);
	}

	switch(operation){
		case '+': input.value = a + b;
				  input.focus();
				  break;	
		case '-': input.value = a - b;
				  input.focus();
				  break;
		case '*': input.value = a * b;
				  input.focus();
				  break;
		case '/': input.value = a / b;
				  input.focus();
				  break;
	}		
})
btMemory.addEventListener("click", function(){
	memory = Number(input.value);
	btClear.click();	
})
btEject.addEventListener("click", function(){
	input.value += memory;

})
btEject.addEventListener("dblclick", function(){
	memory = undefined;
})
btClear.addEventListener("click", function(){
	input.value = "";
	input.focus();
})
