// HomeTask
//1. Проверить правильность расстановки круглых скобок [5] (ВВод строки со скобками и не только, Алгоритм: .length, str[i], счетчик=0, встречается открывающаяся ++, закрывающаяся --б, в ходе выполнения не должен быть отрицательным)
//2. Вычислить arcsinX, используя ряд Тейлора с Т членов (N, X вводятся) (Алгоритм: вводятся 2 числа X,N)
//3. Написать трехшаговый калькуллятор. Алгоритм: 3 строки: число 1, операция, второе число

//Task №1
var str = prompt("Enter a string");
console.log(str);
var k = 0;

for(var i = 0; i < str.length; i++)
{
	if(str[i] == "(")
		k++;
	else 
		if(str[i] == ")")
		k--;

	//console.log(k);

	if(k < 0)
		break;
}

if(k == 0)
	console.log("true");
else
	console.log("false");
//--------------------------------------------------------

//Task №3
var a = Number(prompt("Enter the first value: "));
var sign = prompt("Enter the operation: ");
var b = Number(prompt("Enter the second value: "));

if(a && b || a == 0 || b == 0)
	switch(sign) {
		case '+': 
			console.log("The sum of " + a + " and " + b + " iquals " + (a + b));
			break;
		case '-':
			console.log("The difference of " + a + " and " + b + " iquals " + (a - b));
			break;
		case '*':
			console.log("The product of " + a + " and " + b + " iquals " + (a * b));
			break;
		case '/':
			console.log("The result of the division " + a + " and " + b + " iquals " + (a / b));
			break;
		case '^':
			console.log(Math.pow(a, b));
			break;
		default:
			console.log("It is not an operation");
	}
else
	console.log("It is not a numbers");
//--------------------------------------------------------

//Task №2
var n = Number(prompt("Enter a number of terms"));
var x = Number(prompt("Enter x, which absolute value less than or equals 1"));
var sum = 0;

if(Math.abs(x) <= 1){

	for(var i = 0; i <= n; i++){
		sum += (factorial(2*i) / (Math.pow(4, i) * Math.pow(factorial(i), 2) * (2*i+1))) * Math.pow(x, 2*i+1);
	}

	function factorial(n){
		return n ? n * factorial(n - 1) : 1;
	}

	console.log("The arcsinX iquals " + sum);
}
else
	console.log("you loser!:)");
//--------------------------------------------------------