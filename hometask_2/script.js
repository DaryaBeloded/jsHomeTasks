// Task №2
// Функция, принимающая в качестве параметров массив (коэффициенты многочлена и число х) и возвращающая значение этого многочлена в точке х.
function polynomial (arr){
	var result = 0;
	var x = arr.pop();
	for(var i = 0; i < arr.length; i++){
		result += arr[i] * Math.pow(x, i)
	}
	return result;
}

var arr = prompt("Enter the coefficients of the polynomial, separated by spaces: ").split(" ");
arr.push(prompt("Enter a value of x: "));
console.log(arr);	
console.log("The result equals " + polynomial(arr));
//------------------------------------------------------------------------------------------------

// Task №3
// Функция, возвращающая количество минут до конца дня
function timeEnd(){
	var timeNow = Date.now();
	var endOfTheDay = new Date();
	endOfTheDay.setHours(23,59,59,59);
	return Math.round((endOfTheDay.getTime() - timeNow) / 60000);
}

console.log("The number of minutes until the end of the day is equal to " + timeEnd());
//------------------------------------------------------------------------------------------------

// Task №1
// Функция, генерирующая массив из N случайных чисел со средним значением s и отклонением от него не более чем на p%. Отсортировать массив и вычислить его среднее значение.
function generateArray(lengthOfArr, averageValue, variation){
	var min = averageValue - variation * averageValue / 100;
	var max = averageValue + variation * averageValue / 100;
	var arr = new Array();
	for(var i = 0; i < lengthOfArr; i++){
		arr[i] = (min + Math.random() * (max + 1 - min)).toFixed(2);
 	}
 	return arr;
}

function CompareForSort(first, second){
	return first - second;
}

var array = generateArray(5, 15, 20);
console.log(array);
array.sort(CompareForSort);
console.log(array);

var sum = 0;
for(var i = 0; i < array.length; i++){
	sum += Number(array[i]);
} 

console.log((sum/array.length).toFixed(3));
//------------------------------------------------------------------------------------------------


