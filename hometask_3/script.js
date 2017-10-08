//Task №1
// Создать массивы из N имен и М городов. Сгенерировать массив из N случайных человек - объект с 3 полями и 1 методом, выводящим его на экран.Отсортировать людей по возрасту. Вывести в порядке убывания возрастов

var names = ["Roma", "Dasha", "Vika","Katya","Olya","Igor","Stepa","Misha","Lyba","Lyda","Nikita"];
var cities = ["Baranovichi", "Polotsk", "Novopolotsk", "Vitebsk", "Mogilev"]
var randHuman = [];

for(var i = 0; i < names.length; i++){
	var human = {};
	randHuman[i] = human;
	human.name = names[Math.floor(Math.random() * (names.length))];
	human.city = cities[Math.floor(Math.random() * (cities.length))];
	human.age = Math.floor(Math.random()*100);
	human.print = function(){
		console.log("name: " + this.name + ", city: " + this.city + ", age: " + this.age);
	} 
}
console.log(randHuman);

var randHuman1 = randHuman.concat(); // клонируем массив
// randHuman1.sort(sortHelper);
randHuman1.sort(function(h1, h2){
	return h2.age - h1.age;
})
console.log(randHuman1);

// function sortHelper(human1, human2){
// 	return human2.age - human1.age;
// }

randHuman1.forEach(function(elem){
	elem.print();
})
//------------------------------------------------------------------------------------------------------

//Task №2
//Создать объект Бухгалтерия. В нем хранится массив объектов Работников - имя, возраст, название отдела, стаж работы в компании в месяцах, зарпллата, и метод выводящий сотрудника на печать.
// а) создать в Бухгалтерии метод, который зачислит в предприятие нового сотрудника(объект), или уволит сотрудника(по имени). Использовать методы для заполнения данных Бухгалтерии	
// b)метод, который выведет список людей, отсортированных по зарплате, а также суммарную зарплату по всем людям, используя методы обхода
// c) метод, который выведет человека с максимальной, минимальной зарплатой, а также среднюю з/п по предприятию
// d) метод, выводящий для каждого отдела предприятия суммарную зарплату, среднюю зарплату, кол-во сотрудников, средний возраст сотрудников, а также сотрудника, кто работает дольше всех

var Accounting = {
};
var Employees = [
	{
		name: "Roma",
		age: 20,
		department: "aaa",
		experience: 7.5,
		salary: 1000
	},
	{
		name: "Dasha",
		age: 19,
		department: "bbb",
		experience: 5.5,
		salary: 2300
	},
	{
		name: "Denis",
		age: 26,
		department: "bbb",
		experience: 24,
		salary: 2300
	},
	{
		name: "Vika",
		age: 18,
		department: "ccc",
		experience: 8.4,
		salary: 1200
	}
]
Employees.forEach(function(elem){
	elem.print = function(){
		console.log("name: " + this.name + " department: " + this.department + " salary: " + this.salary);
	}
})
Accounting.employees = Employees;

Accounting.addOrDel = function(param){
	if(typeof(param) == "object" && param != null){
		Accounting.employees[Accounting.employees.length] = param;
		console.log(Accounting);
	}
	if(typeof(param) == "string"){
		// var k = 0;
		// while(Accounting.employees[k].name != param){
		// 	k++;
		// }
		// Accounting.employees.splice(k,1); // удаляем элемент 
		Accounting.employees = Accounting.employees.filter(function(elem){
			return elem.name!=param;
		})
	}
}
// Accounting.addOrDel("Vika");
// var a ={};
// Accounting.addOrDel(a);


Accounting.sortSalary = function(){
	Accounting.employees.sort(function(emp1, emp2){
		return emp1.salary > emp2.salary? 1: -1;
	});
	Accounting.employees.forEach(function(elem){
		elem.print();
	})
}
// Accounting.sortSalary();


Accounting.sumSalary = function(arr){
	var sum = arr.reduce(function(prev, curr){ // prev - результат предыдущей итерации, curr - след элемент
		return prev + curr.salary; 
	}, 0); 
	return sum;
}
// console.log("The full salary = " + Accounting.sumSalary(Accounting.employees));
// Accounting.sumSalary(Accounting.employees);

Accounting.MaxMinAverageSalary = function(){
	var arrSalary = [];
	Accounting.employees.forEach(function(elem){
		arrSalary.push(elem.salary);
	})

	var maxSalary = Math.max.apply(Math, arrSalary);
	var peopleWithMaxSalary = Accounting.employees.filter(function(elem){
		return elem.salary==maxSalary;
	})
	console.log("Peple with max salary: ");
	peopleWithMaxSalary.forEach(function(elem){
		elem.print();
	})

	var minSalary = Math.min.apply(Math, arrSalary);
	var peopleWithMinSalary = Accounting.employees.filter(function(elem){
		return elem.salary==minSalary;
	})
	console.log("Peple with min salary: ");
	peopleWithMinSalary.forEach(function(elem){
		elem.print();
	})

	console.log("The average salary = " + Accounting.sumSalary(Accounting.employees)/Accounting.employees.length);
}
// Accounting.MaxMinAverageSalary();

Accounting.infAboutAllDepartments = function(){
	var arrDepartments = [];
	Accounting.employees.forEach(function(elem){
		arrDepartments.push(elem.department);
	})
	console.log(arrDepartments);

	var uniqueDepartments = arrDepartments.filter(function(elem, pos){
		return arrDepartments.indexOf(elem) == pos; // indexOf вернет первое вхождение элемента в исходном массиве, если они повторяются
	})
	uniqueDepartments.forEach(function(elem){
		var peopleOfDepartment = Accounting.employees.filter(function(elem1){
			return elem1.department==elem;
		})
		var sum = Accounting.sumSalary(peopleOfDepartment);
		console.log("For " + elem + ": the full salary = " + sum);
		console.log("the average salary = " + sum/peopleOfDepartment.length);
		console.log("the number of people = " + peopleOfDepartment.length);
		var sumAge = peopleOfDepartment.reduce(function(prev, curr){ // prev - результат предыдущей итерации, curr - след элемент
			return prev + curr.age; 
		}, 0);
		console.log("the average age = " + sumAge/peopleOfDepartment.length);
		var arrExperience = [];
		peopleOfDepartment.forEach(function(elem){
			arrExperience.push(elem.experience);
		})

		var maxExperience = Math.max.apply(Math, arrExperience);
		var peopleWithMaxExperience = peopleOfDepartment.filter(function(elem){
			return elem.experience==maxExperience;
		})
		console.log("Peple with max experience: ");
		peopleWithMaxExperience.forEach(function(elem){
			elem.print();
		})
	})
}
// Accounting.infAboutAllDepartments();
 
console.log(Accounting.employees);



