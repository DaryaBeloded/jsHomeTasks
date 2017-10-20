var input = FrameWork.Get.ByTagName("input", 0);
var bt = FrameWork.Get.ByTagName("button", 0);

input.focus();
// input.addEventListener("keypress", function(e){
// 	if(e.keyCode >= 48 && e.keyCode <= 57){
// 		this.value += e.key;
// 	}
// 	e.preventDefault();
// })
FrameWork.Event.add("keypress", input, function(e){
	if(e.keyCode >= 48 && e.keyCode <= 57){
		this.value += e.key;
	}
	e.preventDefault();
})

// var f = function(e){
// 	alert("Hi");
// }
// FrameWork.Event.add("click", bt, f);
// FrameWork.Event.remove("click", bt, f);
// var event1 = new Event("click");
// FrameWork.Event.dispatch(event1, bt)
// var div = FrameWork.Get.ByTagName("div", 0);
// var p1 = FrameWork.create("p");
// var bt1 = FrameWork.create("button");
// var inp = FrameWork.create("input");
// console.log(p1);
// FrameWork.append(div, p1);
// FrameWork.prepend(bt1, p1);
// FrameWork.prepend(inp, bt1);



