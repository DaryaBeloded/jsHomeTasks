var FrameWork = {
	append: function(el1, el2){
		return el1.appendChild(el2);
	},
	// prepend: function(parent, elem1, k){
	// 	return parent.insertBefore(elem, parent.children[i]);
	// },
	prepend: function(el1, el2){
			return el2.parentNode.insertBefore(el1, el2);
	},
	remove: function(el){
		return el.remove();
	},
	create: function(name){
		return document.createElement(name);
	},
	Event: {
		add: function(type, elem, f){
			if(typeof(elem.addEventListener)=="function")
				return elem.addEventListener(type, f);
			else
				return elem.attachEvent("on"+type, f);
		},
		remove: function(type, elem, f){
			if(typeof(elem.removeEventListener)=="function")
				return elem.removeEventListener(type, f);
			else
				return elem.detachEvent("on"+type, f);
		},
		dispatch: function(event1,elem){
			return elem.dispatchEvent(event1);
		}
	},
	Get: {
		ById: function(atr){
			document.getElementById(atr);
		},
		ByTagName: function(atr, i){
			return document.getElementsByTagName(atr)[i];
		},
		ByClassName: function(atr){
			return document.getElementsByClassName(atr)[i];
		},
		Selector: function(css){
			return document.querySelector(css);
		},
		SelectorAll: function(css, i){
			return document.querySelectorAll(css)[i];
		}
	}
}